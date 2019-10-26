//まずpython-shellモジュールを読み込む
var { PythonShell } = require('python-shell');

//json形式で別ファイルのpython(script.py)にデータを渡すことを前提にオブジェクト作成
var shell = new PythonShell('test-script.py', {
    mode: 'json',
});

//jsonデータ作成
var json = {
    "a": 4,
    "b": 12,
    "c": 8,
};

// scirpt.pyにJSONを送信
shell.send(json);

// script.pyからの返事を待機
shell.on('message', data => {
    // データを表示 
    console.log(data.result);
});

// 入力を終了
shell.end();
