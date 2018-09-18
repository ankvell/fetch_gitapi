function getOrganizationRepositories(organization) {
  return fetch(
    `https://api.github.com/orgs/${organization}/repos`
  )
    .then(response => response.json())
    .then(response => response.slice(0, 3).map(repo => repo.name));
}

function getContributorsList(organization, repo) {
  return fetch(
    `https://api.github.com/repos/${organization}/${repo}/contributors`
  )
    .then(response => response.json())
    .then(response => response.map(contributor => contributor.login));
}

function getContributors(organization) {
  var collection = {};

  return getOrganizationRepositories(organization).then(response =>
    response.reduce((promise, repository) =>
        getContributorsList(organization, repository).then(array => {
          collection[repository] = array;
          return collection;
        }),
      Promise.resolve()));

  // return getOrganizationRepositories(organization).then(response =>
  //   Promise.all(response.map(repository => getContributorsList(organization, repository).then(
  //     array => {
  //       collection[repository] = array;
  //       return collection
  //     }
  //   )))).then(res => res[0]); /* Please leave some comment how could I usee Promise.all in this case */
}

getContributors('nodejs')
  .then(console.log)
  .catch(console.log);
