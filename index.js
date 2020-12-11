#!/usr/bin/env node

const shell = require('shelljs');
const ora = require('ora');
const inquirer = require('inquirer');
const chalk = require('chalk');
const choices = [
    {
        name: '🚧  工作进行中',
        value: ':construction:',
    },
    {
        name: '🎨  改进代码的结构/格式',
        value: ':art:',
    },
    {
        name: '🐛  修复 bug',
        value: ':bug:',
    },
    {
        name: '⚡️  提升性能',
        value: ':zap:',
    },
    {
        name: '✨  引入新特性',
        value: ':sparkles:',
    },
    {
        name: '🔥  删除代码或文件',
        value: ':new:',
    },
    {
        name: '💄  更新用户界面和样式文件',
        value: ':lipstick:',
    },
    {
        name: '🔧  更改配置文件',
        value: ':wrench:',
    },
    {
        name: '📝  撰写文档',
        value: ':memo:',
    },
    {
        name: '✅  增加测试',
        value: ':white_check_mark:',
    },
    {
        name: '📦  更新打包文件',
        value: ':package:',
    },
    {
        name: '🚀  部署功能',
        value: ':rocket:',
    },
    {
        name: '🎉  初次提交',
        value: ':tada:',
    },
    {
        name: '🔖  发布/版本标签',
        value: ':bookmark:',
    },
    {
        name: '👷  增加CI编译系统',
        value: ':construction_worker:',
    },
    {
        name: '👌  review时更新代码',
        value: ':ok_hand:',
    },
    {
        name: '🙈  更新.gitignore',
        value: ':see_no_evil:',
    },
    {
        name: '🔒  修复安全问题',
        value: ':nut_and_bolt:',
    },
    {
        name: '⬆️  升级依赖项',
        value: ':arrow_up:',
    },
    {
        name: '⬆️  降级依赖项',
        value: ':arrow_down:',
    },
    {
        name: '📌  锁定依赖版本',
        value: ':pushpin:',
    },
    {
        name: '➕  增加依赖',
        value: ':heavy_plus_sign:',
    },
    {
        name: '➖  减少依赖',
        value: ':heavy_minus_sign:',
    },
];

let spinner = null;

async function doStart() {
    try {
        const { title } = await inquirer.prompt([{
            type: 'list',
            message: '请选择提交内容的主题',
            name: 'title',
            choices
        }]);
        const { message } = await inquirer.prompt([{
            type: 'input',
            message: '请输入提交信息',
            name: 'message',
            validate: (input) => {
                if (!input) {
                    return '请输入提交信息'
                }
                return true;
            }
        }]);
        triggerCi({ title, message });
    } catch (e) {

    }
}

async function triggerCi({ title, message }) {
    spinner = ora('ci running...\n').start();
    shell.exec('git add .');
    const command = `git commit -m "${title} ${message}"`;
    const { code, stdout, stderr } = shell.exec(command, {silent:true});
    if (code !== 0) {
        spinner.fail('commit failed');
        console.log(chalk.cyan(`->  ${command}`));
        throw new Error(stdout + '\n' + stderr)
    }
    console.log(stdout)
    spinner.succeed('commit success');
}

doStart();
