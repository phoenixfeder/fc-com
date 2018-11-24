exports.url = (url) => {
    switch(url){
        case "Registration":
            return 'http://localhost:3000/register';
        case "Verification":
            return 'http://localhost:3000/verify'
    }
}