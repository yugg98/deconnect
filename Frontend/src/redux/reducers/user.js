export const user = (state = {}, action) => {
    switch (action.type) {
        case "SAVE_USER":
            return {
                state : action.payload
            }

        default: return state
    }
}
