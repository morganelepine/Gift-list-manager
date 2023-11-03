const datas = {
    tasks: {
        "task-3": { id: "task-3", content: "Charger mon téléphone" },
        "task-4": { id: "task-4", content: "Préparer à manger" },
    },
    columns: {
        "column-1": {
            id: "column-1",
            title: "Tâches à faire",
            taskIds: ["task-3", "task-4"],
        },
        "column-2": {
            id: "column-2",
            title: "Tâches en cours",
            taskIds: [],
        },
    },
    // Pour mieux organiser nos futures colonnes
    columnOrder: ["column-1", "column-2"],
};

const ideas = [
    {
        id: "idea-1",
        title: "Tâches à faire",
        taskIds: "task-1",
    },
    {
        id: "idea-2",
        title: "Tâches à faire",
        taskIds: "task-1",
    },
    {
        id: "idea-3",
        title: "Tâches à faire",
        taskIds: "task-1",
    },
];

const ideasByBrand = {
    "brand-1": [
        {
            id: "column-1",
            title: "Tâches à faire",
            taskIds: "task-1",
        },
        {
            id: "column-1",
            title: "Tâches à faire",
            taskIds: "task-1",
        },
    ],
    "brand-2": [
        {
            id: "column-2",
            title: "Tâches à ne pas faire",
            taskIds: "task-2",
        },
    ],
};
