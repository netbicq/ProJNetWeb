var $ = {
	isArraylike:function(array){
		var length = array && array.length
		return typeof length == 'number' && length >= 0
	},
	each:function(arr,cb){
		if($.isArraylike(arr)){
			for ( i= 0; i < arr.length; i++ ) {
                if(cb.apply(arr[ i ],[i, arr[ i ]]) ===false){
                	break
                }
            }
		}else{
			for (var k in arr) {
                if(cb.apply(arr[ k ],[k, arr[ k ]]) ===false){
                	break
                }
            }
		}
		return arr
	}
}
