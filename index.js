#!/usr/bin/env node

const { program } = require("commander")
let { version, description } = require("./package.json")

const download = require("download-git-repo")
const path = require("path")
const rimraf = require("rimraf")
const inquirer = require("inquirer")
const ora = require("ora")
const chalk = require("chalk")

const dir = path.join(process.cwd(), "template")

rimraf.sync(dir, {})

program.version(version).description(description)

program.command("create <name>").action((name) => {
  inquirer
    .prompt([
      {
        name: "description",
        message: "请输入项目描述",
      },
      {
        name: "author",
        message: "请输入作者",
        default: "Rainy",
      },
    ])
    .then((res) => {
      // console.log(res)
      const spinner = ora("正在下载模板, 请稍后...")
      spinner.start()
      download(
        "direct:https://gitee.com/cloud-app/cloud-app-vue.git",
        dir,
        { clone: true },
        function (err) {
          // console.log(err ? err : "Success")
          if (!err) {
            spinner.succeed()
            console.log(chalk.green("success! 项目初始化成功！"))
            console.log(
              chalk.greenBright("开启项目") +
                "\n" +
                chalk.greenBright("cd " + name) +
                "\n" +
                chalk.greenBright("start to dvelop~!")
            )
          } else {
            console.log(chalk.red("failed! 拉取模板失败", error))
            return
          }
        }
      )
    })
})

program.parse(process.argv)
