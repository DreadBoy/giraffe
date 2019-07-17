workflow "Deploy" {
  resolves = ["deploy"]
  on = "push"
}

action "On master branch" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}


action "deploy" {
  needs = "On master branch"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "deploy"
}
