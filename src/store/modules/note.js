export default {
    state: {
        notes: []
    },
    mutations: {
        updateNotes(state, notes){
            state.notes = notes
        },
        addNote(state, newNote){
            state.notes.push(newNote)
        }
    },
    actions: {
        async fetchNotes(ctx){
            const res = await require('./Notes');
            // console.log(res);
            ctx.commit('updateNotes', res.notes)
        },
        addNote(ctx, newNote){
            ctx.commit("addNote", newNote)
        }
    },
    getters: {
        allNotes(state){
            return state.notes
        },
    },

}