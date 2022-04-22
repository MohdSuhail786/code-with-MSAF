exports.getRank = (score) => {
    if(score >= 1000) {
        return 7
    } else if(score >= 800) {
        return 6
    } else if(score >= 600) {
        return 5
    } else if(score >= 400) {
        return 4
    } else if(score >= 300) {
        return 3
    } else if(score >= 200) {
        return 2
    } else if(score >= 100) {
        return 1
    } else {
        return 0
    }
}

exports.generateVerificationCode = () => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for(var j = 0; j < 4; j++) {
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        text += "-"
    }
  
    return text;
  }