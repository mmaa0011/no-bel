// 表示したいテキストを配列で管理
const scenario = [
  { name: "？？？", text: "……やっと起きた？" },
  { name: "？？？", text: "ここは、あなたが来るはずの場所だったの。" },

  // ★ここで選択肢
  {
    type: "choice",
    choices: [
      { text: "ここはどこ？", next: 3 },
      { text: "あなたは誰？", next: 5 }
    ]
  },

  // ルートA
  { name: "？？？", text: "ここは境目の世界。まだ説明はできないの。" },
  { name: "？？？", text: "でも、あなたは戻るべき。そう思う。" },

  // ルートB
  { name: "？？？", text: "……私？ そうね、名前はまだ言えない。" },
  { name: "？？？", text: "でも覚えていて。あなたが選んだことを。" }
];

let index = 0;       // 今の文章番号
let charIndex = 0;   // テキストの中の現在位置
let speed = 40;      // 文字速度（ms）

const nameBox = document.getElementById("name");
const textBox = document.getElementById("text");
const choicesBox = document.getElementById("choices"); // ← 追加（選択肢表示用）

// 文字を一文字ずつ表示
function typeWriter() {
  let sentence = scenario[index].text;
  if (charIndex < sentence.length) {
    textBox.innerHTML += sentence.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, speed);
  }
}

// 選択肢を表示する処理
function showChoice() {
  textBox.innerHTML = "";
  nameBox.innerHTML = "";
  choicesBox.innerHTML = "";
  choicesBox.style.display = "flex";

  scenario[index].choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.innerText = choice.text;
    btn.onclick = () => {
      choicesBox.style.display = "none";
      index = choice.next;
      nameBox.innerHTML = scenario[index].name || "";
      textBox.innerHTML = "";
      charIndex = 0;
      typeWriter();
    };
    choicesBox.appendChild(btn);
  });
}

// 次の文章へ
function next() {

  // ★選択肢が表示されているときはクリック無効
  if (choicesBox.style.display === "flex") return;

  // タイプ中なら全文表示
  if (charIndex < scenario[index].text.length) {
    charIndex = scenario[index].text.length;
    textBox.innerHTML = scenario[index].text;
  } else {
    // 次の行へ
    index++;
    if (index >= scenario.length) return;

    // ★選択肢判定
    if (scenario[index].type === "choice") {
      showChoice();
      return;
    }

    nameBox.innerHTML = scenario[index].name;
    textBox.innerHTML = "";
    charIndex = 0;
    typeWriter();
  }
}

// 初期表示
nameBox.innerHTML = scenario[0].name;
typeWriter();

// 画面タップで次へ
document.getElementById("game").addEventListener("click", next);
