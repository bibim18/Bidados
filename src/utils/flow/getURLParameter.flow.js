export const getURLParameters = (data) => {
    let result = {};
    let searchIndex = data.indexOf("?");
    
    if (searchIndex == -1 ) return result;
        let sPageURL = data.substring(searchIndex +1);
        const sURLVariables = sPageURL.split('&');
        for (let i = 0; i < sURLVariables.length; i++) {       
            let sParameterName = sURLVariables[i].split('=');      
            result[sParameterName[0]] = sParameterName[1];
        }
        console.log(result)
        return result;
}