async function getOrganizationRepositories(organization) {
  const response = await fetch(`https://api.github.com/orgs/${organization}/repos`);
  const json = await response.json();
      return json.slice(0, 3).map(repo => repo.name);
}

async function getContributorsList(organization, repo) {
  const response = await fetch(`https://api.github.com/repos/${organization}/${repo}/contributors`);
  const json = await response.json();
      return json.map(contr => contr.login);
}

async function getContributors(organization) {
  let collection = {};
  const response = await getOrganizationRepositories(organization);
  for (let repository of response) {
    collection[repository] = await getContributorsList(organization, repository);
  }
  return collection;
}

getContributors('nodejs')
.then(console.log)
.catch(console.log);