export default {
    state: {
        notes: []
    },
    mutations: {
        updateNotes(state, notes){
            state.notes = notes
        },
        // createPost(state, newPost){
        //     state.posts.unshift(newPost)
        // }
    },
    actions: {
        async fetchNotes(ctx){
            const res = await require('./Notes');
            // console.log(res);
            ctx.commit('updateNotes', res.notes)
        }
    },
    getters: {
        allNotes(state){
            return state.notes
        },
    },

}