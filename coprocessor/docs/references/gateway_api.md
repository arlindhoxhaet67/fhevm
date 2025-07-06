{
  "GET /keyurl": {
    "description": "Retrieve URLs for public keys and CRS files from an S3 bucket. Includes multi-sig cryptographic signatures where >1/3 of signatures are needed for validation.",
    "query_parameters": null,
    "headers": null,
    "response_success_200": {
      "status": "success",
      "response": {
        "crs": {
          "<bit_size>": {
            "data_id": "<20-byte hex id>",
            "param_choice": "<integer>",
            "signatures":[ "<EIP712 hex signature>", "..."],
            "urls":[ "<URL>", "..."]
          }
        },
        "fhe_key_info":[
          {
            
              "fhe_public_key":{
               	"data_id":"<20-byte hex id>",
               	"param_choice":"<integer>",
               	"signatures":["<EIP712 signature>", "..."],
               	"urls":["<URL>", "..."]
              },
             	"fhe_server_key":{
               	"data_id":"<20-byte hex id>",
               	"param_choice":"<integer>",
               	"signatures":["<EIP712 signature>", "..."],
              	 	"urls":["<URL>","..."]
              }
           }
        ],
        // Deprecated: fetch signing keys directly from TKMS blockchain config contract
        verf_public_key:[
         { 
            key_id:"408d8cbaa51dece7f782fe04ba0b1c1d017b1088",
            server_id:<int>,
            verf_public_key_url:"<URL to PublicSigKey serialization>",
            verf_public_key_address:"<URL to human-readable Ethereum address>"
         }
       ]
      }
    },
    400: {"error":"BadRequest","message":"The request is invalid or missing required parameters."},
    404: {"error":"NotFound","message":"The requested resource was not found."},
    500: {"error":"ServerError","message":"An internal server error occurred. Please try again later."}
  },

  "POST /verify_proven_ct": {
  	"description":
  		"Submit batch of proven ciphertexts; returns multi-sig TKMS server signatures (>1/3 needed) and meta info including listener type and optional co-processor proof_of_storage.",
  	
  	query_parameters:{
  		contract_address:"EIP-55 encoded with '0x' prefix",
  		caller_address:"EIP-55 encoded with '0x' prefix",
  		crs_id:"20 byte lower-case hex ID",
  		key_id:"20 byte lower-case hex ID",
  		ct_proof:"Hex encoding of TFHE-RS ProvenCompactCiphertextList safe_serialization"
  	},
  	headers:null,
  
  	response_success_200:{
    	status:"success",
    	response:{
    	 handles:["32 byte lower-case hex handle", "..."],
    	 kms_signatures:["hex EIP712 sig on ProvenCompactCiphertextList", "..."],
    	 listener_type:["FHEVM_NATIVE", or,  COPROCESSOR],
    	 proof_of_storage:["hex EIP712 sig from co-processor if COPROCESSOR else empty string"]
     }
   },
  
   errors:{
     400: {"error":"BadRequest","message":"The request is invalid or missing required parameters."},
     404: {"error":"NotFound","message":"The requested resource was not found."},
     500: {"error":"ServerError","message":
      	 	 	 	  		  		  		        		        	        	        		        	      	    		   	    		   	    		   	        		        				                  	     		        	        		    		   			            		 			            	            	            		  			     			  				 			   				  			 			    		  			   			  			     			 			  			      	  				   	 	                      		 		 	      		     		     		      		      		                 		        		       			      
                					  	    			      	    			      		    		       	       		    	    	 	      	            	       	     	             	          	          	        	         	          	         	          	        	         	            	    	            	            
    	 					            	            		                 				        
    	 					            		
      	  		    	    				   
    	  		    
    	 						  		    
    	   	   	  	     
    	   	   	
    	   	 
    	   	  
    	   	   
    	   	   	  
            	   	   
            	   	    
            	   	    	
            	   	    
            	   	    
                	   	 
                	   	 
                	 }   
 	 } 
},

  

  
  
  
  

  


 





 






  




  

  

  

  
	

  
  
    

    

    


,"POST /reencrypt":{
"description":
"The endpoint decrypts an FHE ciphertext under an ephemeral key via partial secret sharing signcryption by TKMS servers, returning a list of signcrypted plaintext shares requiring >1/3 threshold for recovery.",
	
	query_parameters:{
	  signature:"Hex EIP712 sig on the target public encryption key enc_key",
	  client_address:"EIP-55 encoded with '0x' prefix end-user address who receives reencrypted response",
	  enc_key:"Hex libsodium public encryption key (lowercase)",
	  ciphertext_handle:"32 byte lowercase hex identifying ciphertext to fetch/re-encrypt",
	  eip712_verifying_contract:("EIP-55 encoded contract holding the ciphertext")
},

headers:null,

response_success_200:{
	status:'success',
	response:[
	   {payload:'bincode encoding of signcryption + metadata',signature:'hex EIP712 signature'},
	   {payload:'...',signature:'...'}
	   ]
},

errors:{
400:{ error:'BadRequest', message:'The request is invalid or missing required parameters.' },
404:{ error:'NotFound', message:'The requested resource was not found.' },
500:{ error:'ServerError', message:
'An internal server error occurred. Please try again later.'
}
}

}

}
