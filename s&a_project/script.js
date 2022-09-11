let quizData = [
    {
    "text":"次の説明が示す用語は何? コンピュータやプリンタなどにネットワーク機能を追加するための拡張カードの一種。PCやプリンタなどをLANに接続し、通信を行う役割をもつ。",
    "choice": ["ネットワークインターフェイスカード", "イーサネット","メモリーカードアダプタ","NVIDIA"],
    "answer": 1
    },{
        "text": "次の説明が示す用語は何? IPアドレスが送受信の対象コンピュータを識別する情報であるのに対して、データの宛先となるアプリケーションを表す情報。",
        "choice": ["ソケット","ポート番号","識別コード","IPアドレス"],
        "answer":2
    },{
        "text":"ソフトウェア作者の著作権を守ったままソースコードを無償公開することを意味するライセンス形態、またはそのライセンス形態によって提供されるソフトウェアのこと。",
        "choice": ["OSS", "フリーシェア","プロプライエタリ","Github"],
        "answer":1
    },{
        "text":"電気的に書き換え可能であり、電源を切ってもデータが消えない半導体メモリ。",
        "choice":["フロッピーディスク","Blu-ray Disc","HDD","フラッシュメモリ"],
        "answer":4
    },{
        "text":"最初に入れたデータが最初に取り出されるようなデータ構造を示すのは次の内どれか。",
        "choice":["キュー","リスト","LIFO","ツリー"],
        "answer":1
    },{
        "text":"タグを使って文書構造を定義するマークアップ言語で、ウェブページを記述するために開発された。コンテンツを部分をタグで囲むことで、その部分を意味づけする。",
        "choice":["SQL","Python","HTML","VBA"],
        "answer":3
    },{
        "text": "主記憶とは異なる半導体(SRAM)を使用した非常に高速にアクセスできるメモリ。CPUと主記憶の速度差を埋め、CPUの処理効率を向上させる。",
        "choice":["GPU", "キャッシュメモリ","ストレージ","仮想記憶"],
        "answer":2
    },{
        "text": "情報セキュリティマネジメントの概念の一要素で、情報が完全で、改ざん・破壊されていない特性を示す。",
        "choice":["機密性","完全性","可用性","信頼性"],
        "answer":2
    },{
        "text":"暗号化された電子的な署名で、この署名によって、情報が署名した本人であることと、改善されていないことが証明される。",
        "choice":["デジタル署名","電子署名","セキュリティ署名","暗号化署名"],
        "answer":1
    },{
        "text":"銀行やクレジットカード会社などの有名企業を装ったメールを送付し、個人情報を不正に搾取する行為。メール内のハイパーリンクをクリックさせ、偽サイトに誘導し個人情報を収集する詐欺の一種。",
        "choice":["ランサムウェア","ワンクリック詐欺","偽サイト詐欺","フィッシング詐欺"],
        "answer":4
    }
];

let quizList = [];
function chooseQuiz(){
    for(var i=0,len=quizData.length;i<10;i++,len--){
        rand = Math.floor(Math.random() * len);
        quizList.push(quizData.splice(rand,1)[0]);
    }
}


function createQuiz(){
    chooseQuiz();
    let problem = '';
    for (let quiz of quizList){
        problem += `<div class='one-ele'><h2 id='quiz-line'>${quiz.text}</h2>
        <ul>`;
        for(let i = 0; i < 4; i++){
            problem += `
            <li>
                <input type='radio' name='${quizList.indexOf(quiz)}' id='btn${quizList.indexOf(quiz)}-${i}' value='${i + 1}'>
                <label for='btn${quizList.indexOf(quiz)}-${i}'>${quiz.choice[i]}</label>
            </li>
            `;
        }
        problem += '</ul></div>';
    }
    document.getElementById('quiz-text').innerHTML = problem;
}

let grade = [];

function check(){
    if(confirm('採点しますか？')){
        //クイズに回答があるかを確認する変数
        let flag = false;
    
        for(let quiz of quizList){
            //それぞれの問題に回答があるか
            let flagg = false;
            let elements = document.getElementsByName(`${quizList.indexOf(quiz)}`);
            for(let item of elements){
                if(item.checked){
                    //回答がある
                    flag = true;
                    flagg = true;
    
                    if(quiz.answer == item.value){
                        grade.push('1');
                        //正解のときは1
                    }else{
                        grade.push('0');
                        //不正解のときは0
                    }
                }
            }
            if (!flagg){
                //回答がない場合も不正解
                grade.push('0');
            }
        }
        if(!flag){
            alert('何も選択されていません');
        }else{
            document.getElementById('grade').disabled = true;
            const quizLen = quizList.length;
            let crct_num = 0;
            for (let correct of grade){
                crct_num += Number(correct);
            }
            const result_text = document.getElementById('result');
            result_text.innerHTML = `${quizLen}問中${crct_num}問正解！`;

            //解答を見るボタンを表示する
            document.getElementById('reflection').style.display = 'inline';

            //音声が流れる関数を呼び出す。
            // voiceRun(rate);
        }
    }
}

function reflection(){
    let answers = '';
    for(let quiz of quizList){
        let crct_answer = quiz.choice[quiz.answer - 1];
        answers += `<h3>${quiz.text}</h3>`;
        if(grade[quizList.indexOf(quiz)]==1){
            answers += `
            <h4 id='circle'>◯</h4>
            <h4>正解！答えは${crct_answer}だね。</h4>
            `;
        }else{
            answers += `
            <h4 id='cross'>✕</h4>
            <h4>残念。正解は、${crct_answer}。</h4>
            <hr>
            `;
        }
    }
    document.getElementById('answers').innerHTML = answers;
}

//音声を流す関数
// function voiceRun(rate){
//     if(rate>=75){
//         console.log(rate);
//     }else if(rate>=50){
//         console.log('50%');
//     }else if(rate>=25){
//         console.log('25%');
//     }else{
//         console.log('under 25%');
//     }
//     console.log('success');
// }