module.exports = function(RED) {
    "use strict";
    var bl3p = require('bl3p');

    function AddOrderNode(config) {
        RED.nodes.createNode(this,config);
	var node = this;
	var bl3p_auth = new bl3p.Bl3pAuth(this.credentials.publickey, this.credentials.privatekey);

        node.on('input', function(msg) {
            if ( msg.currency === undefined ) {
		node.send({result:false,payload:"no currency is set"});
		return;
            }
            if ( msg.currency !== "EUR") {
		node.send({result:false,payload:"Currency is not allowed"});
		return;
            }
            if (msg.ordertype === undefined ) {
		node.send({result:false,payload:"ordertype is not set"});
		return;
            }
            if (["bid","ask"].includes(msg.ordertype) === false ) {
		node.send({result:false,payload:"ordertype must be bid or ask"});
		return;
            }
            if ( msg.dca_amount === undefined ) {
		node.send({result:false,payload:"dca_amount is not set"});
		return;
	    }
            if ( msg.dca_amount <  1) {
		node.send({result:false,payload:"dca_amount is smaller than 1"});
		return;
	    }
            if ( msg.dca_amount > 100 ) {
		node.send({result:false,payload:"dca_amount is larger than 100"});
		return;
	    }
            bl3p_auth.add_order(msg.dca_amount * 1e5, msg.ordertype, undefined, msg.currency, msg.dca_amount * 1e5, function(error,data){
               if ( data ) {
                 node.send({result:true,payload:"Succesfully bought bitcoin"});
               } else {
                 node.send({result:false,payload:"Failed to buybitcoin"});
               }
            });
        });
    }
    RED.nodes.registerType("add-order",AddOrderNode,{
      credentials: {
        publickey: {type:"text"},
        privatekey: {type:"password"}
      }
    });
};

