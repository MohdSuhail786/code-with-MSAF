exports.isEmpty = (val) =>{
    if (val === undefined)
        return true;

    if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
        return false;

    if (val == null || val.length === 0)        // null or 0 length array
        return true;

    if (typeof (val) == "object") {
        var r = true;
        for (var f in val)
            r = false;
        return r;
    }
    return false;
}

exports.validate = (obj,fields) => {
    const validationError = [];
    
    fields.forEach(field => {
        if(this.isEmpty(obj[field])) validationError.push(`${field} is required`)
    });

    if(validationError.length) {
        return {ok:false,error:validationError[0]}
    }
    return {ok:true,error:null}
}