<template>
    <div class="new-note">
        <div class="note-header">
            <div class="title">
                <label>Title</label>
                <input v-model="note.title" type="text">
            </div>
            <div class="importance">
                <select  v-model="note.importance">
                    <option
                            v-for="imp in importances"
                    >{{ imp }}
                    </option>
                </select>
            </div>
        </div>
        <label>Description</label>
        <textarea v-model="note.descr"></textarea>


        <button class="btn btnPrimary" @click="addNote">New note</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                impSelect: 'regular',
                importances: ['regular', 'important', 'very-important'],
            }
        },
        props: {
            note: {
                type: Object,
                required: true
            },
        },
        methods: {
            addNote() {
                this.$emit('addNote', this.note)
                this.note.importance = 'regular'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .new-note {
        text-align: center;
    }

    .note-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            width: 70%;
        }
        .importance{
            width: 25%;
            margin-bottom: 20px;
            select{
                display: block;
                width: 100%;
                font-size: 24px;
                color: #444444;
                padding: 16px 26px;
                border-radius: .5em;
            }
        }
    }

    .btn {
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>

