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
        },
        removeNote(state, index){
            state.notes.splice(index, 1)
        },
        setTitleNote(state, payload){
            let {index, str} = payload
            state.notes[index].title = str
        },
        setDescrNote(state, payload){
            let {index, str} = payload
            state.notes[index].descr = str
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
        },
        removeNote(ctx, index){
            ctx.commit("removeNote", index)
        },
        setTitleNote(ctx, payload){
            let {index, str} = payload
            ctx.commit("setTitleNote", {index,str})
        },
        setDescrNote(ctx, payload){
            let {index, str} = payload
            ctx.commit("setDescrNote", {index,str})
        }
    },
    getters: {
        allNotes(state){
            return state.notes
        },
    },

}