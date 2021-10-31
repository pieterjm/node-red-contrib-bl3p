module.exports = function(RED) {
    "use strict";
    var bl3p = require('bl3p');

    function Bl3pApiNode(config) {
	RED.nodes.createNode(this,config);
    }
    RED.nodes.registerType("bl3p-api",Bl3pApiNode,{
	credentials: {
            publickey: {type:"text"},
            privatekey: {type:"password"}
	}
    });
    
    
    function AddOrderNode(config) {
        RED.nodes.createNode(this,config);
	var node = this;
	var bl3papi = RED.nodes.getNode(config.bl3p);
	var bl3p_auth = new bl3p.Bl3pAuth(bl3papi.credentials.publickey,bl3papi.credentials.privatekey);
	
        node.on('input', function(msg) {
            if ( msg.fee_currency === undefined ) {
		node.send({result:false,payload:"fee_currency is required"});
		return;
            }
            bl3p_auth.add_order(msg.amount, msg.type, msg.price, msg.fee_currency, msg.amount_funds, function(error,data){
		if ( data ) {
		    data = JSON.parse(data);
		    if ( data.result === "success" ) {
			node.send({result:true,payload:data});
		    } else {
			node.send({result:false,payload:data});			
		    }
		 } else {
                     node.send({result:false,payload:error,data:data});
		}
            });
        });
    }

    function CancelOrderNode(config) {
	RED.nodes.createNode(this,config);
	var node = this;
	var bl3papi = RED.nodes.getNode(config.bl3p);
	var bl3p_auth = new bl3p.Bl3pAuth(bl3papi.credentials.publickey,bl3papi.credentials.privatekey);
	node.on('input', function(msg) {
            if ( msg.order_id === undefined ) {
		node.send({result:false,payload:"order_id is required"});
		return;
            }
            bl3p_auth.cancel_order(msg.order_id, function(error,data){
		if ( data ) {
		    data = JSON.parse(data);
		    if ( data.result === "success" ) {
			node.send({result:true,payload:data});
		    } else {
			node.send({result:false,payload:data});			
		    }
		 } else {
                    node.send({result:false,payload:error});
		}
            });
        });
    }

    function OrderInfoNode(config) {
	RED.nodes.createNode(this,config);
	var node = this;
	var bl3papi = RED.nodes.getNode(config.bl3p);
	var bl3p_auth = new bl3p.Bl3pAuth(bl3papi.credentials.publickey,bl3papi.credentials.privatekey);
	node.on('input', function(msg) {
            if ( msg.order_id === undefined ) {
		node.send({result:false,payload:"order_id is required"});
		return;
            }
            bl3p_auth.order_info(msg.order_id, function(error,data){
		if ( data ) {
		    data = JSON.parse(data);
		    if ( data.result === "success" ) {
			node.send({result:true,payload:data,order_id:msg.order_id});
		    } else {
			node.send({result:false,payload:data,order_id:msg.order_id});			
		    }
		 } else {
                     node.send({result:false,payload:error,orderid:msg.order_id});
		}
            });
        });
    }

    function AccountInfoNode(config) {
	RED.nodes.createNode(this,config);
	var node = this;
	var bl3papi = RED.nodes.getNode(config.bl3p);
	var bl3p_auth = new bl3p.Bl3pAuth(bl3papi.credentials.publickey,bl3papi.credentials.privatekey);
	node.on('input', function(msg) {
            bl3p_auth.account_info(function(error,data){
		if ( data ) {
		    data = JSON.parse(data);
		    if ( data.result === "success" ) {
			node.send({result:true,payload:data});
		    } else {
			node.send({result:false,payload:data});			
		    }
		 } else {
                    node.send({result:false,payload:error});
		}
            });
        });
    }
    
    
    
    RED.nodes.registerType("add-order",AddOrderNode);
    RED.nodes.registerType("cancel-order",CancelOrderNode);
    RED.nodes.registerType("order-info",OrderInfoNode);    
    RED.nodes.registerType("account-info",AccountInfoNode);    
};

