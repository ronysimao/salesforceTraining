({
    serverSideCall : function(component,action) 
    {
        return new Promise(function(resolve, reject) { 
            action.setCallback(this, 
                               function(response) 
                               {
                                   var state = response.getState();
                                   if (state === "SUCCESS") 
                                   {
                                       resolve(response.getReturnValue());
                                   } 
                                   else 
                                   {
                                       reject(new Error(response.getError()));
                                   }
                               }); 
            $A.enqueueAction(action);
        });
    },
    
    cadastraCliente : function(component, event, helper) {
        var calloutAction = component.get("c.realizaCallout"); //cadastraCliente
        
        const cliente = {
            Nome : component.get('v.Nome'),
            Sobrenome : component.get('v.Sobrenome'),
            CPF : component.get('v.CPF'),
            Telefone : component.get('v.Telefone')
        };
        
        console.log(JSON.stringify(cliente));
        
        calloutAction.setParams( 
            {"PessoaMesa1": JSON.stringify(cliente)}
        );
        
        helper.serverSideCall(component, calloutAction).then(
            function(res) {
                component.set("v.response", res); 
            }
        ).catch(
            function(error) {
                helper.showToast('stick', error, 'Erro', '2000', 'error');
            }
        );
    },
    
    showToast : function(mode, message, title, duration, type) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            mode: mode,
            title: title,
            message: message,
            duration : duration,
            type : type
        });
        toastEvent.fire();
    }
})
