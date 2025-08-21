export const getTerminalGridClasses = (index, totalTerminals) => {
    if (totalTerminals === 1) {
        return "col-span-full row-span-full"; // 1 jendela penuh
    } else if (totalTerminals === 2) {
        return "col-span-1 row-span-full"; // 2 jendela, masing-masing setengah lebar dan penuh tinggi
    } else {
        // Lebih dari 2 jendela
        if (index === 0) {
            // Jendela pertama: setengah lebar, penuh tinggi
            return "col-span-1 row-span-full";
        } else {
            // Jendela kedua dan seterusnya: setengah lebar, dibagi secara vertikal
            // Perhatikan bahwa ini akan berada di "kolom kedua" secara implisit karena kita sudah menempatkan jendela pertama di `col-span-1`
            return "col-span-1 row-span-1";
        }
    }
};