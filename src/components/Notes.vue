<template>
    <div class="notes">
        <div class="note" :class="classOb(note)" v-for="(note, index) in notes" :key="index">
            <div class="note-header" :class="{ full: !grid }">
                <input type="text"
                       :ref="'input_title_note_' + index"
                       @click.stop =""
                       v-show="notes[index].titleEdit"
                       v-model="titleNew"
                       @keyup.enter="saveNote(index)"
                       @blur="saveNote(index)"
                       @keyup.esc="discardNote(index)"
                       autofocus
                >
                <p v-show="!notes[index].titleEdit" @click="editStr(index, note.title)">{{ note.title }}</p>
                <p style="cursor: pointer" @click="removeNote(index)">x</p>
            </div>
            <div class="note-body">
                <textarea
                       :ref="'input_descr_note_' + index"
                       @click.stop =""
                       v-show="notes[index].descrEdit"
                       v-model="descrNew"
                       @keyup.enter="saveNote(index)"
                       @blur="saveNote(index)"
                       @keyup.esc="discardNote(index)"
                ></textarea>
                <p v-show="!notes[index].descrEdit"  @click="editStr(index, note.descr)">{{ note.descr }}</p>
                <span>{{ note.date }}</span>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                titleNew: '',
                descrNew: '',
            }
        },
        props: {
            notes: {
                type: Array,
                required: true
            },
            grid: {
                type: Boolean,
                required: true
            }
        },
        computed: {
            classOb() {
                return (note) => {
                    return {
                        important: note.importance === 'important',
                        veryImportant: note.importance === 'very-important',
                        full: !this.grid
                    }
                }
            }
        },
        methods: {
            removeNote(index) {
                console.log(`Note id ${index}- removed`)
                this.$emit('remove', index)
            },
            editStr(index, str){
                //console.log(this.notes[index]);
                if(str === this.notes[index].title){
                    this.notes[index].titleEdit = true
                    this.notes[index].titleOld = str
                    this.titleNew = str
                    this.$nextTick(() => {
                        this.$refs['input_title_note_' + index][0].focus();
                    })

                }
                if(str === this.notes[index].descr){
                    this.notes[index].descrEdit = true
                    this.notes[index].descrOld = str
                    this.descrNew = str
                    this.$nextTick(() => {
                        this.$refs['input_descr_note_' + index][0].focus();
                    })

                }
            },
            saveNote(index){
                if (this.titleNew.length > 0){
                    //this.notes[index].title = this.titleNew
                    this.$store.dispatch('setTitleNote', {index, str: this.titleNew})
                    this.titleNew = ''
                    this.notes[index].titleEdit = false
                }
                if (this.descrNew.length > 0){
                    // this.notes[index].descr = this.descrNew
                    this.$store.dispatch('setDescrNote', {index, str: this.descrNew})
                    this.descrNew = ''
                    this.notes[index].descrEdit = false
                }
            },
            discardNote(index){
                // console.log(this.notes[index]);
                if (this.notes[index].titleEdit){
                    this.notes[index].title = this.notes[index].titleOld
                    this.titleNew = ''
                    this.notes[index].titleEdit = false
                }
                if (this.notes[index].descrEdit){
                    this.notes[index].descr = this.notes[index].descrOld
                    this.descrNew = ''
                    this.notes[index].descrEdit = false
                }
            }
        }
    }
</script>

<style lang="scss">
    .notes {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 40px 0;
    }

    .note {
        width: 48%;
        padding: 18px 20px;
        margin-bottom: 20px;
        background-color: #fff;
        transition: all .25s cubic-bezier(.02, .01, .47, 1);
        box-shadow: 0 30px 30px rgba(0, 0, 0, .02);

        &:hover {
            box-shadow: 0 30px 30px rgba(0, 0, 0, .04);
            transform: translate(0, -6px);
            transition-delay: 0s !important;
        }

        &.full {
            width: 100%;
            text-align: center;
        }

        &.important {
            border: 2px solid orange;
            box-shadow: 0px 0px 17px -5px orange;
        }

        &.veryImportant {
            border: 2px solid red;
            box-shadow: 0px 0px 17px -5px red;
        }

        input{
            width: 90%;
            height: 30px;
            margin-bottom: 0;
        }

        textarea{
            padding: 15px;
        }
    }

    .note-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1 {
            font-size: 32px;
        }

        p {
            font-size: 22px;
            color: #444ce0;
        }

        svg {
            margin-right: 12px;
            color: #999999;

            &.active {
                color: #444ce0;
            }

            &:last-child {
                margin-right: 0;
            }
        }

        &.full {
            justify-content: center;

            p {
                margin-right: 16px;

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .note-body {
        p {
            margin: 20px 0;
        }

        span {
            font-size: 14px;
            color: #999999;
        }
    }
</style>