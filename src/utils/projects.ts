type Project = {
    name: string,
    repo: string
}

const PROJECTS: Map<string, Project> = new Map();

PROJECTS.set("mafaka", {
    name: "Mafaka",
    repo: "MafakaMC/Mafaka"
});
export default PROJECTS;
