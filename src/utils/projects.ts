type Project = {
    name: string,
    repo: string
}

const PROJECTS: Map<string, Project> = new Map();

PROJECTS.set("mafaka", {
    name: "mafaka",
    repo: "krebinski/mafaka"
});
export default PROJECTS;
