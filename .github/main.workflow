workflow "Deploy from master" {
  resolves = ["Deploy"]
  on = "push"
}

action "On master branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Install dev dependencies" {
  needs = "On master branch"
  uses = "actions/npm@master"
  args = "install"
}

action "Deploy" {
  needs = "Install dev dependencies"
  uses = "actions/npm@master"
  args = "run deploy"
}
