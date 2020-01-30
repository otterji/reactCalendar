# 2. Backing up and sharing - 백업과 공유 

* 챕터 1에서 만든 변경사항들을 가지고 이제 우리의 프로젝트 카피를 *원격 저장소 (Remote repo)* 로 Push 할 수 있다. 이렇게 push 한 내용들은 원격 저장소에서 변경내용을 포함한 파일/디렉토리들을 백업하며 동시에 다른 팀원들과 협업할 수 있게 한다.
* 일단 그러려면 원격 저장소를 제공하는 서비스에 가입해야 하는데, 일단 우리는 가장 많이 쓰이는 [Github](https://github.com/) 에 가입하자. Github은 공개(Public) repo 에 대해서는 무료지만, 개인(Private) repo 는 유료이다. 이에 대한 대안은 후에 소개한다.
* Github 에 local repo 에 존재하는 코드를 올리는 것은 백업과 협업의 의미도 있지만, 그 자체로 포트폴리오의 의미를 갖는다. 때문에 최대한 많은 public 프로젝트들을 생성하고 Github 에서 관리하는것은 여러모로 큰 장점을 갖는다.



## 2.1 Signing up for Github - Github 가입하기

* [Github sign up](https://github.com/)
* Github 가입이 완료되면, 나중에 repo 를 push 할 때, ID/PW 를 입력하는 방법과, 컴퓨터의 지문(SSH key)을 등록해서 컴퓨터-Github 계정간의 연동을 통해 별도 절차 없이 push 가능한 방법이 있다. (한 컴퓨터의 SSH key 는 한 Github 계정에 연동할 수 있다.) 
*  [Full Document](https://help.github.com/articles/connecting-to-github-with-ssh/)



## 2.2 Remote repo - 원격 저장소

* Github 에서 **New Repository** 를 통해 새로운 원격 저장소를 만든다.
  * 'Repository name' 은 website 로,
  * 'Description' 은 자유롭게 작성,
  * Public 으로 체크되어 있으면 그 이외에는 수정 없이 Create repository.
* 이후 나오는 화면은 우리의 local repo 역시 처음 생성되었다고 가정하고 작성되어 있기에, `git add` 와 `git commit` 파트는 넘어간다.
* `git remote add` 라고 적힌 부분을 복사한다. (SSH Key 등록을 한 상태와 안한 상태의 주소가 다르다.)
* 대략 다음과 같은 형태

```shell
(master)$ git remote add origin https://github.com/<name>/webiste.git
(master)$ git push -u origin master
id:
pw:
```

* SSK Key 등록을 하지 않았다면 github 의 id 와 pw 를 입력해야 한다. pw 는 입력해도 보이지 않지만, 정상적으로 입력되고 있는 중이다.
* 첫 번째 명령어는, 마지막에 있는 Github remote repo 를 *remote origin* 으로 설정한다. (1회)
* 두 번째 명령어는, 우리의 local repo 를 설정한 remote repo 로 push(코드 보내기) 한다.
  * `git push` 의 `-u` 옵션은, 해당 Github remote repo 를 *upstream repository* 로 설정한다는 의미.
  * 이제부터 `git pull` 명령어를 사용하면 모든 변경사항을 자동으로 모든 변경사항을 함께 다운로드한다.
  * 이 부분은 챕터 4에서 다룬다. 지금은 크게 신경쓰지 말자.
* `git push` 가 정상적으로 실행 되었다면, 원격 repo 페이지를 새로고침 하고 코드가 정상적으로 올라갔는지 확인 해보자.



### Exercises

1. Githup 에서 "Commits" 버튼을 눌러 `git log` 와 같은지 확인해보자.
2. 커밋 버튼을 눌러 `git diff` 와 같게 나오는지 확인하자.



## 2.3 Adding a README - README 파일 추가하기.

* 처음 remote repo 를 생성한 이후 나오는 페이지에서,  “Help people interested in this repository understand your project by adding a README." 라는 노트와 함께 Github이 README 파일을 추가하라고 한다.
* 실제로도 Github Repo 에는 README 가 필수다. 이번기회에 한번 작성해 보자.
* Github 에 `Add a README` 라고 하는 버튼이 있지만, 일반적으로는 로컬에서 작성해 푸쉬한다.
* `website/` 디렉토리 안에 `$ touch README.md` 라는 명령어를 통해 파일을 생성하고 열어보자.
* 자유롭게 내용 작성

```markdown
# Git 배우기용 Website

이 repo 는 Git 과 Github 의 기본적인 사용법을 익히기 위한 실습용으로 제작된 페이지 입니다.
```

---

* 성공적으로 `README.md` 파일을 생성하고 내용도 작성했으므로, 우선 로컬 repo 에서 커밋하자.

```shell
(master)$ git add .
(master)$ git commit -m 'Add README file'  # -am 으로 옵션을 줘도 상관없지만, 의미론적으로는 -m 만 사용.
```

* 로컬 repo 에 성공적으로 커밋했다면 이제 원격 repo 로 push 할 일만 남았다.
* 처음 `git push` 할 때 set upstream 의 의미로, `-u` 옵션과, 목적지로 `origin` 과 `master` 를 설정했지만, 한 번 설정된 이후로는, 그냥 바로 `git push` 할 수 있다.

```shell
(master)$ git push
```

* 이제 다시 Github 을 확인해 보면, 첫 화면에 README.md 파일이 나타나는 걸 볼 수 있다.



### Exercises

```markdown
Git 에 대한 추가정보를 보려면, [공식 Git Documentation](https://git-scm.com/) 을 확인하세요.
```

1. 다음 줄을 `README.md` 마지막 줄에 추가하자.
2. 커밋을 하되, `git add` 명령어를 실행하지 않고도 커밋 할 수 있다. 어째서?
3. Github 에서 실제로 반영된 것을 확인하고 링크도 정상 작동하는지 확인하자.

## 2.4 Summary

| Command                  | Description                   | Example                       |
| ------------------------ | ----------------------------- | ----------------------------- |
| `git remote add`         | 원격 repo 추가                | `$ git remote add origin`     |
| `git push -u <loc> <br>` | 해당 원격 repo branch 로 push | `$ git push -u origin master` |
| `git push`               | 설정된 default 원격으로 push  | `$ git push`                  |



