module.exports = {
    generateColor: () => {
        let letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    repoSize: (size) => {
        let repoSizeOriginal;

        if (size < 1024) {
            repoSizeOriginal = size + " KB";

        } else {

            repoSizeOriginal = Math.round(size / 1024).toFixed(1) + " MB";

        }
        return repoSizeOriginal;

    }
};