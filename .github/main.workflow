workflow "Deploy" {
  resolves = ["deploy"]
  on = "push"
}

action "On master branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}


action "Deploy" {
  needs = "On master branch"
  uses = "actions/npm@master"
  args = "deploy"
}
