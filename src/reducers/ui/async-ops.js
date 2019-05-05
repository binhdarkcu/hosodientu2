import {START_ASYNC_OP, END_ASYNC_OP} from '../../actions/types'
import {handleActions} from 'redux-actions'

const defaultState = {
    workingShade: false,
    currentIds: [],
    shadedIds: [],
    //We're not displaying errors yet, but this is the way to handle displaying errors to the user when we do
    errorMessages: []
}

const asyncOps = handleActions({
    [START_ASYNC_OP]: (state, action) => {
        const newShadedIds = action.payload.needsShade ? [...state.shadedIds,
            action.payload.id] : state.shadedIds

        return {
            workingShade: newShadedIds.length > 0,
            currentIds: [...state.currentIds,
                action.payload.id],
            shadedIds: newShadedIds,
            //This is not what should be happening here. We should have a separate system for displaying and removing
            //error messages. This is just a temporary way to get them cleared out
            errorMessages: []
        }

    }, [END_ASYNC_OP]: (state, action) => {
        const id = action.payload.id;
        const existingIds = state.currentIds
        const removeIndex = existingIds.findIndex(existing => id === existing)

        if (removeIndex !== -1) {
            //This is one way to copy an array
            const newIds = existingIds.slice()

            newIds.splice(removeIndex, 1)
            let newErrors = [];

            if (action.payload.errorMessage) {
                newErrors = [action.payload.errorMessage]
            }
            const shadedIndex = state.shadedIds.findIndex(idIndex => action.payload.id)
            let newShaded = state.shadedIds;

            if (shadedIndex !== -1) {
                newShaded = state.shadedIds.slice();
                newShaded.splice(shadedIndex, 1)
            }
            return {
                workingShade: newShaded.length > 0,
                currentIds: newIds,
                shadedIds: newShaded,
                errorMessages: newErrors
            }
        }
        console.log(`Found op id: ${id} that was not current`)
        return state;


    }
}, defaultState);

export default asyncOps
