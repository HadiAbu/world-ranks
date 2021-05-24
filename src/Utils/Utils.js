
class Utils {
    orderBy = (arr, key="population", dir="asc") =>{
        if(dir === "asc"){
            return [...arr].sort((a,b)=> a[key] >= b[key] ? 1 : -1);
        }
        if(dir === "desc"){
            return [...arr].sort((a,b)=> a[key] < b[key] ? 1 : -1);
        }
        return arr;
    }
}

export default new Utils();