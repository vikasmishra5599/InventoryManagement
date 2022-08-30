function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

export const rows = [
    createData('Pendrive', 159, 6.0, 24, 4.0),
    createData('desktop', 237, 9.0, 37, 4.3),
    createData('locks', 262, 16.0, 24, 6.0),
    createData('cable', 305, 3.7, 67, 4.3),
    createData('wires', 356, 16.0, 49, 3.9),
    createData('adopter', 356, 16.0, 49, 3.9),
    createData('mouse', 356, 16.0, 49, 3.9),
];
