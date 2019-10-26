import sys, json
from sympy import *
x=Symbol('x') #文字'x'を変数xとして定義

# nodejsスクリプトからデータを受信
data = json.loads(sys.stdin.readline())
a = data["a"]
b = data["b"]
c = data["c"]

# 方程式の解を求める
sol=solve(a*x**3+b*x**2+c*x, x)

# 各解をintに変換
intsol = [int(value) for value in sol]

# オブジェクトを作成
response = {"result": intsol}
# JSON文字列にして出力
print(json.dumps(response))
