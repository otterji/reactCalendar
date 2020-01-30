#  3. Intermediate workflow - 중급 작업

* 이번 챕터에서는, repo 에 새로운 디렉토리추가, 특정 파일들을 Git 이 무시하도록 하는 법, *브랜치(branch)* 와 *합치기(merge)*, 그리고 에러가 났을 때 복구하는 법을 다룬다.
* Git 에 대한 백과사전적인 지식들을 나열하는 것 보다, 실무에서 사용되는 기술들을 배우는 데 집중하자.



## 3.1 Commit, push, repeat

* 일단 우리 사이트에 이미지를 추가하는 것 부터 시작하자. 새로운 디렉토리와 파일들을 추가한다.

```shell
(master)$ pwd
/Users/neo/Git/website
(master)$ mkdir images
```

* 다음과 같이  `images/` 에 사용할 이미지를 다운로드 하자.

```shell
(master)$ curl -o images/breaching_whale.jpg -OL neovansoarer.github.io/files/breaching_whale.jpg
```

* 이제 다운 받은 이미지를 `img` 태그를 사용하여 넣자.
* `img` 태그는 다음과 같이 구성된다.

```html
<img src="path/to/file" alt='설명' />
```

* 우리의 경우 `index.html` 기준으로 `images/` 의 `breaching_whale.jpg` 이므로 다음과 같이 작성한다.

```html
<!DOCTYPE html>
<html>
<head>
  <title>A whale of greeting</title>
</head>
<body>
  <h1>hello, world</h1>
  <p>Call me neo.</p>
  <img src="images/breaching_whale.jpg">
</body>
</html>
```

---

* 이 시점에서 `git diff` 를 통해 바뀐 내용을 확인하자.

```shell
(master)$ git diff
diff --git a/index.html b/index.html
index 7ed9da6..628e960 100644
--- a/index.html
+++ b/index.html
@@ -6,5 +6,6 @@
 <body>
   <h1>hello, world</h1>
   <p>Call me neo.</p>
+  <img src="images/breaching_whale.jpg">
 </body>
 </html>
```

* 또한 `git status` 를 통해 `images/` dir 이 untracked 상태임도 확인하자.

```shell
(master)$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   index.html

Untracked files:
  (use "git add <file>..." to include in what will be committed)

  images/
  
no changes added to commit (use "git add" and/or "git commit -a")
```

* 등록되지 않은(untracked) 상태의 파일들과 디렉토리들을 추가해야 하므로, `git add` 하고 이어서 커밋과 푸쉬 작업까지 해보자.

```shell
(master)$ git add .
(master)$ git commit -m "Add an image"
(master)$ git push
```

* 리모트 repo 에 자주 푸쉬하는 버릇을 들이는 건 좋은 습관인데, 확실한 백업을 하는것과 동시에, 함께 작업하는 사람들이 지속적으로 변경사항을 pull 할 수 있게 하기 때문이다.
* Github 을 새로고침 해보면, `images/` 디렉토리와 이미지 파일이 업로드 된걸 확인할 수 있다.



### Exercises

1. 이미지 파일을 클릭하여 `git push` 가 성공적으로 되었는지 확인하자.
2. 지금 시점이면, 충분히 많은 log 가 싸여 있다. `git log -p` 명령어의 결과물을 `less` 로 pipe 하여 확인해 보자.
3. 위의 화면에서, 검색을 통해 HTML 구조에 `DOCTYPE` 을 선언했던 commit 의 SHA 를 찾아보자.



## 3.2 Ignoring files - 파일 무시하기

* Git repo 에서 자주 발생하는 이슈는, 커밋하고 싶지 않은 파일들이 있다는 점이다. 예를 들면, 보안 증명이나 컴퓨터 설정 파일, 로그파일들, 임시파일들 같은 경우에는, 컴퓨터간에 공유될 필요가 없다.
* 예를 들어 macOS 같은 경우 Finder 를 사용하여 디렉토리를 열 경우, `.DS_Store` 라는 숨김파일이 생성된다. 이렇게 생성된 파일의 경우에는, 여기에 기록된 내용의 경우 우리의 repo 가 추적할 필요가 없지만, 다른 사용자들과 함께 협업할 경우 지속적으로 충돌(conflict) 가 난다.
* 이런 귀찮은 상황을 피하기 위해서 `.gitignore` 이라는 파일을 사용한다. 이 파일에 적힌 항목들은, Git 이 알아서 repo 에 등록하지 않고 무시한다.
* 강제로 특정 파일을 만들어 보고 해당 파일을 `.gitignore` 에 등록하여 동작하는 방식을 확인해보자.

```shell
(master)$ touch .logfile
(master)$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

  .logfile

nothing added to commit but untracked files present (use "git add" to track)
```

```shell
(master)$ touch .gitignore
(master)$ echo '.logfile' > .gitigonre
(master)$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Untracked files:
  (use "git add <file>..." to include in what will be committed)

  .gitignore

nothing added to commit but untracked files present (use "git add" to track)
```

* 원래 있던 `.logfile` 이 `git status` 결과창에서 사라지고 `.gitignore` 만 나타난다.

---

* `.gitignore` 을 처음으로 사용해 보았다. 하지만, 매번 이렇게 등록할 파일들을 직접 입력하는 건 매우 귀찮은 일이다.
  * 예를 들면, Vim 같은 경우에는, 가끔 *임시파일(temporary file)* 을 생성하는데, `~` 가 작성중인 파일 이름 뒤에 붙는 경우, 해당 파일은 임시 파일이다. (`foo` 를 작업하고 있다면, `foo~` 파일이 생성된다.)
  * repo 안에 파일이 10개 있고 Vim 으로 작업중이라면, 10개의 임시파일이 생성된다. 모두 gitignore 등록은..?
* 이럴 경우, 와일드카드 (wildcards `*`) 를 사용하여 `~` 로 끝나는 모든 파일들을 무시하라고 작성할 수 있다.

```/
*~
```

* 다음 줄을 `.gitignore` 에 추가하면, 모든 Vim 임시파일들이 무시된다. 
* 특정 디렉토리를 명시할 수도 있다. 가령 `tmp/` 라고 하는 디렉토리를 통째로 무시하고 싶다면, 다음과 같이 작성한다.

```
tmp/
```

* `.gitignore` 파일을 작성하는 것은 살짝 복잡하지만, 실제 프로젝트에서는 필수적이다. 특정 프레임워크들 같은 경우에는, 프로젝트를 생성할 때 동시에 `.gitignore` 파일을 같이 생성해 주는 경우도 많다.



### Exercises

1. `.gitignore` 파일을 커밋하자. (`git commit -am` 만으로는 충분하지 않다! 왜?)
2. Push 작업 이후 확인해보자.



## 3.3 Brancing and merging

* Git 의 가장 강력한 기능중에 하나는, *브랜치(branch)* 만들기다.
  * 프로젝트를 복사하여, 각자의 브랜치에서 작업하고, 
  * 각 브랜치의 변경사항을 다시 *머지(merge)* 하는 식으로 작업이 진행된다.
* 이러한 브랜치의 가장 큰 장점은, 변경사항을 *마스터(master)* 브랜치에서 독립시켜서 작업하고, 이후 변경사항을 합치는(merge) 것이다.
* 이렇게 진행하는 작업은 특히 남들과의 협업에서 매우 유용하다. 각자 분리된 브랜치에서의 작업은 다른 개발자들과 독립된 상태에서 개발을 진행할 수 있고, 충돌(conflict)의 위험을 줄일 수 있다.

---

* 이번에는 `index` 페이지에 이어, "About Page" 를 만들며 Git branch 를 사용해 보자.
* 우선 `git checkout` 명령을 `-b` 옵션과 함께 사용하며 브랜치 이름(about-page)을 함께 명시하면, `about-page` 라는 이름의 새로운 브랜치를 만들며 동시에 해당 브랜치로 'check out' 한다. (Check out : 로컬 repo 의 파일들을 복사한다는 뜻. 특정 버젼을 명시해주거나, 가장 최신 버젼을 가져온다.)

```shell
(master)$ git checkout -b about-page
(about-page)$ 
```

* 프롬프트에서 `(master)` 가 `(about-page)` 로 바뀐 것을 확인할 수 있다.
* 이제 우리는 새로운 `about-page` 로 check out 하였다. 현재 상황을 도식으로 나타내면 다음과 같다.![git_branch](./images/git_branch.png)
* repo 는 결국 이어지는 커밋들로 이루어 져 있으며, 브랜치는 브랜치가 만들어지는 시점에 복사본과 함께 만들어 진다.
* 우리는 `about-page` 브랜치에서 작업을 하며, 완료된 이후 `master` 브랜치로 변경사항들을 합칠 것이다.(`git merge`)

---

* 현재 우리가 있는 브랜치를 `git branch` 명령어로 확인할 수 있다.

```shell
(about-page)$ git branch
* about-page
master
```

* `git branch` 는 현재 로컬에 존재하는 브랜치들을 모두 보여주며, `*` 마크로 현재 check out 한 브랜치를 표시해 준다.
* 우선 `about.html` 이라는 파일을 만들어 우리 프로젝트에 대한 정보를 입력할 것이다.
* `index.html` 처럼 모든 HTML 구조가 잡혀있어야 하므로, `index.html` 을 복사하여 사용하자.

```shell
(about-page)$ cp index.html about.html
```

* 그리고 `about.html` 을 열어 다음과 같이 수정하자.

```html
<!DOCTYPE html>
<html>
<head>
  <title>About this project</title>
</head>
<body>
  <h1>About</h1>
  <p>
  	This site is a sample project for the <strong>AWESOME Git tutorial</strong>.
  </p>
</body>
</html>
```

* 이제 현재의 About page 의 현재 버젼을 커밋하자. `about.html` 이 새 파일이기 때문에, add 와 커밋을 해야한다. 다음과 같이 한번에 작성해 보자.

```shell
(about-page)$ git add . && git commit -m "Add About page"
```

* 성공적으로 커밋이 진행 되었다면, 현재 `about-page` 브랜치는 `master` 브랜치에서 분기되어 다음과 같은 상황이다.![about_page_branch_first_diff](./images/about_page_branch_first_diff.png)
* `about-page` 를 `master` 브랜치와 병합(merge) 하기 전에, `index.html` 을 다음과 같이 수정하자. (`a` 태그 추가)

```html
<!DOCTYPE html>
<html>
<head>
  <title>A whale of greeting</title>
</head>
<body>
  <h1>hello, world</h1>
  <a href="about.html">About this project</a>
  <p>Call me neo.</p>
  <img src="images/breaching_whale.jpg">
</body>
</html>
```

* `a` 태그는 *anchor* 태그라고 하여 하이퍼 링크를 생성한다.
* `index.html` 수정 이후, 커밋을 진행해 보자.

```shell
(about-page)$ git commit -am "Add a link to the About page"
```

* 해당 커밋 이후 이제 `about-page` 브랜치는 다음과 같다.![about_page_branch_index_changes](./images/about_page_branch_index_changes.png)

---

* 이제 `about-page` 브랜치를 `master` 브랜치와 병합(merge) 할 차례이다.
* `master` 브랜치와 비교하여 어떤 변경사항이 merge 될 예정인지 `git diff` 명령어로 확인할 수 있다.
* `git diff branch-1 branch-2` 는 `branch-1` 과 `branch-2` 를 비교한다. 만약 브랜치를 하나만 입력하면, 기본적으로, 현재 브랜치(`* about-page`) 와 입력한 브랜치간의 차이를 보여준다.

```shell
(about-page)$ git diff master
```

이렇게 입력하면 현재 브랜치와 `master` 브랜치를 비교한다. `less` 로 pipe 하면 대략 다음과 같이 나타난다.

```
diff --git a/about.html b/about.html
new file mode 100644
index 0000000..323ad08
--- /dev/null
+++ b/about.html
@@ -0,0 +1,12 @@
+<!DOCTYPE html>
+<html>
+<head>
+  <title>About this project</title>
+</head>
+<body>
+  <h1>About</h1>
+  <p>
+       This site is a sample project for the <strong>AWESOME Git tutorial</strong>.
+  </p>
+</body>
+</html>
diff --git a/index.html b/index.html
index 628e960..6ca3766 100644
--- a/index.html
+++ b/index.html
@@ -5,6 +5,7 @@
 </head>
 <body>
   <h1>hello, world</h1>
+  <a href="about.html">About this project</a>
   <p>Call me neo.</p>
   <img src="images/breaching_whale.jpg">
 </body>
:
```

* `about-page` 브랜치의 변경사항을 `master` 브랜치로 병합하려면, 우선 `master` 브랜치로 check out 해야한다.

```shell
(about-page)$ git checkout master
(master)$ 
```

* `about-page` 브랜치를 생성 + check out 할 때와는 달리, `-b` 옵션을 사용하지 않는데, 이유는 `master` 브랜치는 이미 존재하고 있기 때문이다.
* 이제 `git merge` 에 merge 할 브랜치 명을 입력하고 두 브랜치를 병합(merge) 하자.

```shell
(master)$ git merge about-page
Updating 9c07ee9..aee1ce5
Fast-forward
 about.html | 12 ++++++++++++
 index.html |  1 +
 2 files changed, 13 insertions(+)
 create mode 100644 about.html
(master)$
```

* 이 시점에 브랜치 구조는 다음과 같다.![about_page_merged](./images/about_page_merged.png)

* 현재까지의 경우에는, 우리가 `about-page` 에서 작업할 때 변경되지 않았다.

* 하지만 실제 상황에서는, `master` 브랜치는 다른 브랜치가 작업중이고, merge 되지 않았더라도 계속해서 커밋을 이어 나갈 수 있다.

* 이런 상황은 다른 개발자와의 협업에서 더욱 많이 일어나지만, 혼자 작업할 때도 일어날 수 있다.

  * 가령, 우리가 `master` 브랜치에서 철자가 틀린걸 고치고 즉시 push 했다고 생각해 보자. 
  * 이 경우 `master` 브랜치는 커밋이 일어났지만 `about-page` 브랜치는 여전히 작업 중이고, 둘은 다른 내용을 저장하여 가지고 있다.
  * 이 상황을 그림으로 표현하면 다음과 같은 상황일 것이다. ![master_branch_change](images/master_branch_change.png)


  * 이럴때 merge 를 시도하면 일어나는 것이 *충돌(conflict)* 이다. 하지만 Git은 자동으로 내용을 merge 하는 기능도 가지고 있다.
  *  어쩔 수 없는 conflict 가 일어 났을때, 수동으로 해당 conflict 를 해결할 수 도 있다. 챕터 4에서 알아보도록 하자.

* 성공적으로 `git merge` 를 했다면, 이제 `git push` 를 통해 push 하자. (로컬 `master` 브랜치를 Github 의 `origin/master` 와 동기화 한다.)

```shell
(master)$ git push
```



### Rebasing

* 브랜치를 합치는 가장 일반적인 방법은 `git merge` 이지만, 다른 방법으로 `git rebase` 라는 명령어도 있다.
* 둘의 차이는 크지 않지만 사용해야 하는 상황이 다르므로 현재 단계에서는 **`git rebase` 명령어는 무시하도록 하겠다.**
* `git rebase` 는 Git 을 잘 사용하는 시니어나 선배 개발자가 `git rebase` 를 사용하라고 할 경우에만 사용하도록 하고, 그게 아니라면, 두 개의 브랜치를 merge 하는 경우는 `git merge` 를 사용하도록 하자.

### Exercises

1. `git branch -d about-page` 명령어를 통해 특정 브랜치를 삭제하자. `git branch` 로 삭제 되었는지도 확인하자.

2. `test-branch` 라는 브랜치를 생성 & check out 할 때 `git branch -b test-branch` 라는 명령어로 한번에 진행할 수 있지만, 이걸 두 단계로 나눠서 진행 할 수 도 있다.

   1. 첫 번째로 `git branch <branch name>` 으로 특정 브랜치를 생성한다. 이렇게 생성하고 `git branch` 명령어로 해당 브랜치가 생성되었는지,  `*` 마크의 위치는 어디를 가르키고 있는지 확인하자.

   2. `test-branch` 로 check out 하고 `touch` 명령어로 `test_file` 을 생성한 이후, add - commit 을 진행하자.

   3. 이제 `master` 브랜치로 check out 이후 `ls ` 로 `test_file` 이 없음을 확인하자. 그리고 `git branch -d test-branch` 를 통해 해당 `test-branch` 의 삭제를 시도해 보자.

      ```shell
      (master)$ git branch -d test-branch
      error: The branch 'test-branch' is not fully merged.
      If you are sure you want to delete it, run 'git branch -D test-branch'.
      ```

   4. 위와 같이 진행되지 않아야 한다. 왜냐하면 `about-page` 와 다르게 `test-branch` 는 merge 가 이루어 지지 않았기 때문에 `-d` 는 동작하지 않는다. 하지만 우리는 실제로 `test-branch` 에서 일어난 변경사항은 `master` 에 merge 되길 바라지 않기 때문에, merge 되지 않았어도 강제로 해당 브랜치를 지워버리는 `-D` 옵션을 통해 `test-branch` 를 삭제하자.



## 3.4 Recovering from errors - 에러상황에서 복구하기

* Git 의 가장 유용한 기능중 하나는, 재앙같은 error 상황에서 복구하는 것이다. 에러 복구 테크닉들은 위험한 경우도 있기에, 항상 조심해야 한다.
* 만약 우리가 작업하는 도중, 의도치않은 변경사항으로 인해 에러가 발생하여, 마지막 커밋(`HEAD` 라고 부르는 상태)으로 상태를 되돌리고 싶다고 가정해 보자.
* 만약 `about.html` 의 파일 내용이 `>>` (append) 를 사용하려다 `>` (redirection) 을 사용해 버려 모두 날라간 상황을 만들어 보자.

```shell
(master)$ echo '' > about.html
(master)$ cat about.html
(master)$
```

* 일반적인 unix dir 이라면, 현재 상태를 복구할 방법이 없다. 하지만 Git repo 에서는 강제로 가장 마지막 커밋 버젼으로 repo 의 상태를 되돌릴 수 있다.

```shell
(master)$ git status
On branch master
Your branch is up-to-date with 'origin/master'.
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

  modified:   about.html

no changes added to commit (use "git add" and/or "git commit -a")
```

* `git status` 로는 현재 우리의 데미지를 확인할 수 없다. `git diff` 를 사용하자.

```shell
(master)$ git diff
diff --git a/about.html b/about.html
index 323ad08..8b13789 100644
--- a/about.html
+++ b/about.html
@@ -1,12 +1 @@
-<!DOCTYPE html>
-<html>
-<head>
-  <title>About this project</title>
-</head>
-<body>
-  <h1>About</h1>
-  <p>
-       This site is a sample project for the <strong>AWESOME Git tutorial</strong>.
-  </p>
-</body>
-</html>
```

* 수많은 `-` 사인이 현재 모든 내용들이 사라졌다는 걸 보여준다.
* 다행히도, 이런 변경사항을 `git checkout` 명령어에 `-f` (force) 옵션을 붙여 강제로 Git 이 `HEAD` 로 check out 할 수 있게 해준다.

```shell
(master)$ git checkout -f
(master)$ git status
On branch master
nothing to commit, working tree clean
(master)$ 
```

* "working tree(directory) clean" 는 변경사항이 없다는 의미며, 마지막 커밋 상태로 모든 파일상태가 되돌려 졌다.
* 다만 `git checkout -f` 는 커밋 이후에 작업한 **모든 변경사항**들을 원래대로 돌려버리므로(**복구할 수 없다**..) 확실하게 되돌려도 될 경우에만 사용하자.

---

* 잘못된 상태에 대한 또 다른 튼튼한 복구 방법은 브랜치를 사용하는 것이다. 
* 새로운 브랜치를 생성할 경우, 해당 브랜치는 다른 모든 브랜치들과 격리되어 있기 때문에, 만약 정말 무언가가 잘못된다면, 그저 `master` 브랜치로 돌아온 이후 해당 브랜치를 삭제해 버리면 된다.
* 위에서 만든 실수 상황을 브랜치에서 다시 구현해 보자.

```shell
(master)$ git checkout -b test-branch
(test-branch)$ echo > about.html
```

* 이전과 달리 이러한 실수의 내용이 커밋까지 진행되어버린 상태에서 브랜치를 삭제해 보자.

```shell
(test-branch)$ git commit -am 'WTF'
(test-branch)$ git checkout master
(master)$ git branch -D test-branch
```

* `-d` 가 아닌 `-D` 를 사용하는 이유는, 해당 브랜치의 변경사항이 `master` 와 merge 되지 않았기 때문이다.
* `master` 브랜치와 `test-branch` 는 merge 되기 전까지 완전히 독립적이기 때문에, `test-branch` 의 변경사항은 전혀 `master` 브랜치에 영향을 주지 않았고, 우리는 그저 `test-branch` 를 삭제해 주기만 하면 된다. 

---

* 마지막 복구 예시는, repo 의 특정 버젼으로 check out 하는 것이다.
* 특정 버젼을 명시하기 위해 `git log` 에서 나오는 SHA 를 사용한다.
* 가령 repo 를 `index.html` 파일에 내용을 추가한 직후의 상태로 되돌리고 싶다면,
  * `git log` 를 실행하여 
  * `G` 를 입력해 log 의 시작줄로 돌아간다. (`git log` 는 `less` 유틸리티를 사용하므로, `G` 를 입력하면 첫줄로 이동한다.)
* 대략 다음과 같은 화면이 나오면 된다. (내용의 자세한 부분은 모두 다른것이 정상이다)

```
(master)$ git log
commit 512cc9c554df0b1143395d40435bcba4bdf818f0
Author: Taeyoung Yu <neovansoarer@gmail.com>
Date:   Fri Apr 13 03:27:05 2018 +0900

    Add content to index.html

commit 0c1f5e3934768db64eb12c766c6c9cfc09259ed0
Author: Taeyoung Yu <neovansoarer@gmail.com>
Date:   Fri Apr 13 03:25:31 2018 +0900

    Add bar

commit 8c1eba5b31d27d774e73c2884918d6592ef6a3ab
Author: Taeyoung Yu <neovansoarer@gmail.com>
Date:   Fri Apr 13 03:25:26 2018 +0900

    Add foo

commit bb91e48c59c48fe043ba8b49983330cbc9119d0c
Author: Taeyoung Yu <neovansoarer@gmail.com>
Date:   Fri Apr 13 03:22:33 2018 +0900

    Initialize repository
:
```

* "Add content to index.html" 이 메세지로 있는 커밋으로 check out 하려 한다면, 

  * 해당 커밋의 SHA 를 전체 복사하여 다음과 같이 작성하거나

  ```shell
  (master)$ git checkout 512cc9c554df0b1143395d40435bcba4bdf818f0
  Note: checking out '512cc9c554df0b1143395d40435bcba4bdf818f0'.

  You are in 'detached HEAD' state. You can look around, make experimental
  changes and commit them, and you can discard any commits you make in this
  state without impacting any branches by performing another checkout.

  If you want to create a new branch to retain commits you create, you may
  do so (now or later) by using -b with the checkout command again. Example:

    git checkout -b <new-branch-name>

  HEAD is now at 512cc9c... Add content to index.html

  (512cc9c)$ 
  ```

  * SHA 의 앞자리 몇 글자(4자리 이상)만 입력하고 Enter 해도 된다.

  ```shell
  (master)$ git checkout 512cc
  Note: checking out '512cc'.

  You are in 'detached HEAD' state. You can look around, make experimental
  changes and commit them, and you can discard any commits you make in this
  state without impacting any branches by performing another checkout.

  If you want to create a new branch to retain commits you create, you may
  do so (now or later) by using -b with the checkout command again. Example:

    git checkout -b <new-branch-name>

  HEAD is now at 512cc9c... Add content to index.html

  (512cc9c)$ 
  ```

* 프롬프트(`$`) 앞의 브랜치 이름이 SHA 로 바뀐걸 확인하자. 또한 경고 메시지로 'detached HEAD(분리된 HEAD(맨 마지막 커밋))' 라는 상태(state)라고 한다.

* 이 방법은, 해당 커밋으로 가서 코드들을 참고하기만 하고, (`git diff master`) 잘못된 부분을 체크한 다음 `master` 브랜치로 check out 한 이후 수정하는 식으로 사용하길 권장한다.

```shell
(512cc9c)$ git diff master
(512cc9c)$ git checkout master
(master)$
```

---

* 여기까지의 개념들이 너무 추상적이더라도 걱정하지 말고 두 가지만 기억하자.
  1. 이전 버젼의 상태로 돌아가는 것이 가능하다.
  2. 이러한 workflow 에서 길을 잃었다면, 구글링 과 Git 기경험자의 도움을 받자.



### Exercises

1. `git checkout -f` 는 파일들이 커밋되기 전에 stage 된 상태이거나, repo 의 일부로 등록되어 있을 때만 동작한다. 하지만, 새로운 파일들이 추가되었을 경우에도 삭제가 되는데, 실제로 아무 파일이나 생성하고, `git add` 한 이후에 `git checkout -f` 를 통해 삭제되는 걸 확인하자.

   ```shell
   (master)$ touch fake_file
   (master)$ git status
   On branch master
   Changes to be committed:
     (use "git reset HEAD <file>..." to unstage)

   	new file:   fake_file

   (master)$ git add fake_file
   (master)$ git checkout -f
   (master)$ git status
   On branch master
   nothing to commit, working tree clean
   ```

2. 많은 Unix 프로그램들이 옵션에 있어서 짧은 형식과 긴 형식(short-form & long-form) 을 지원한다. 이전에 했던 스텝을 그대로 진행하되, `git checkout --force` 를 사용하여 똑같이 동작하는지를 확인해 보자.

   * 추가로 `git help checkout` 에서 "force" 옵션에 대해 더 확인해 보자.



## 3.5 Summary

| Command                 | Description                                                  | Example                          |
| ----------------------- | ------------------------------------------------------------ | -------------------------------- |
| `.gitignore`            | Git 이 무시할 파일들 명시                                    | `$ echo .DS_store >> .gitignore` |
| `git checkout <br>`     | 브랜치 로 check out                                          | `$ git checkout master`          |
| `git  checkout -b <br>` | Check out & 브랜치 생성                                      | `$ git checkout -b about-page`   |
| `git branch`            | 로컬 브랜치들 보여주기                                       | `$ git branch`                   |
| `git merge <br>`        | 브랜치 병합(merge)                                           | `$ git merge about-page`         |
| `git branch -d <br>`    | 브랜치 삭제(merge 한 경우)                                   | `$ git branch -d about-page`     |
| `git branch -D <br>`    | **위험** 브랜치 삭제(어떤 경우든지)                          | `$ git branch -D other branch`   |
| `git checkout -f`       | **위험** 강제로 check out (명시 하지 않으면 `master` 브랜치로), 변경사항 날아감. | `$ git add . && git checkout -f` |