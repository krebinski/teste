type Project = {
    name: string,
    repo: string
}

const PROJECTS: Map<string, Project> = new Map();

PROJECTS.set("leaves", {
    name: "Mafaka",
    repo: "MafakaMC/Mafaka"
});
export default PROJECTS;
