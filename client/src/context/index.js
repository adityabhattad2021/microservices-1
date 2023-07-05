import {useContext,createContext,useReducer} from "react"

const StateContext = createContext();

function reducer(state,action){
    switch(action.type){
        case 'setTitle':{
            return {...state,title:action.payload}
        }
        case'setPosts':{
            return {...state,listOfPosts:action.payload}
        }
        default:{
            throw new Error("Undefined State");
        }
    }
}

export function StateContextProvider({children}){

    const [state,dispatch]=useReducer(reducer,{
        title:"",
        listOfPosts:{},
    })

    return (
        <StateContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export function useStateContext(){
    return useContext(StateContext);
}