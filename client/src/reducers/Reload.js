const Reload = (state = [] , action) => {
    
    switch(action.type){
        case "Load":
            state = action.render
        
            return state;
            default:
                return state;
    }
   
}
export default Reload;