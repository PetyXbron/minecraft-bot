module.exports = {
    removeVersion(string) {
        const serverVersions = [
            "airplane", "akarin", "bukkit", "bungeecord", "cardboard",
            "cleanstone", "craftbukkit", "cuberite", "cuberite", "empirecraft", "fabric",
            "flexpipe", "forge", "geyser", "glowstone", "hexacord", "kettle", "lava",
            "lavabukkit", "leafish", "magma", "mohist", "nukkit", "paper", "purpur",
            "sonarlint", "spigot", "tacospigot", "travertine", "velocity", "velocity",
            "waterfall", "yatopia"
        ];
        serverVersions.forEach(function (el) {
            string = string.toLocaleLowerCase().replaceAll(`${el} `, "");
        });
        return string;
    }
};