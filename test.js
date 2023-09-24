const notesInitial = [
    {
        _id: "64fca56a27e40c878c594127",
        user: "64fb481764b95ffdc6636aae",
        title: "my title1",
        description: "wake up early1",
        tag: "person",
        createdAt: "2023-09-09T17:03:38.298Z",
        updatedAt: "2023-09-09T17:03:38.298Z",
        __v: 0,
    },
    {
        _id: "64fd6d4b205b456b0cabcca0",
        user: "64fb481764b95ffdc6636aae",
        title: "hello",
        description: "wake up and say hello :)",
        tag: "person",
        createdAt: "2023-09-10T07:16:27.794Z",
        updatedAt: "2023-09-10T08:59:51.609Z",
        __v: 0,
    }
]

const fil = notesInitial.filter((note) => {
    return note._id !== "64fca56a27e40c878c594127"
})
console.log(fil)