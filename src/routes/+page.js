// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
//export const prerender = true;

export const ssr = false

import { db, setTodo } from "$lib/firebase/db"
import { collection, doc, setDoc, getDocs, query, getDoc, onSnapshot, addDoc } from "firebase/firestore"
import { writable } from "svelte/store"


export async function load() {
    const dd = await db
    const todos = collection(dd, "todo")
    const snaps = writable([])
    const hold = writable([])

    /*await onSnapshot(collection(db, "todo"), (snapshot) => {
        snaps.set(snapshot.docs);
    });*/
    await onSnapshot(doc(db, "todo", "list1"), (snapshot) => {
        snaps.set([snapshot]);
    });
    await snaps.subscribe((vall) => vall.forEach(async (v, i) => {
        hold.set([])
        for (let k in v.data()) {
            hold.update((old)=>[
                ...old,
                {
                    id: old.length + 1,
                    name: v.data()[k],
                    checked: false
                }
            ])
        }
    }))
    hold.subscribe((vall) => {
        return vall
    })
    return { snaps, itemsH: hold };
}
