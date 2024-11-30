router.pattern(/^\/v2\/projects\/[^\/]+\/versions\/[^\/]+\/?$/, async function (request, response) {
    response.contentType = "application/json";
    try {
        const projectId = request.url.split("/")[3];
        console.log(`Verificando projeto ID: ${projectId}`);

        // Verifica se o projeto existe em PROJECTS
        if (!PROJECTS.has(projectId)) {
            console.log(`Projeto ${projectId} não encontrado.`);
            return restError.$404(response);
        }

        const projectData = PROJECTS.get(projectId);
        const version = request.url.split("/")[5];
        console.log(`Buscando builds para a versão: ${version}`);

        // Verificação adicional para garantir que a versão não seja inválida
        if (!version || version.trim() === "") {
            console.log("Versão inválida.");
            return restError.$400(response, "Versão inválida.");
        }

        const client = mongo.client;
        await client.connect();
        
        const versionGroup = Utils.getVersionGroup(version);
        console.log(`Consultando grupo de versão: ${versionGroup}`);

        // Realiza a consulta no banco de dados
        const results = await client
            .db(projectId)
            .collection(versionGroup)
            .find({ version: { $eq: version } })
            .toArray();

        // Verifica se foram encontrados builds para a versão
        if (results.length === 0) {
            console.log(`Nenhum build encontrado para a versão: ${version}`);
        }

        const builds = results.map(entry => entry.build_id);

        // Ordena os builds (se necessário) e prepara a resposta
        response.status = 200;
        response.response = {
            code: 200,
            project_id: projectId,
            project_name: projectData.name,
            version: version,
            builds: builds.sort((a, b) => a - b)
        };
    } catch (e) {
        console.error("Erro ao processar a requisição:", e);
        return restError.$500(response);
    }
});
