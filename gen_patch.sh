current_dir=$(pwd)
tmp_dir=$(mktemp -d)

cd $tmp_dir
git init

cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js $tmp_dir/go_wasm.js
git add -f .
git commit -m "init"

cp $current_dir/go_wasm.js $tmp_dir/go_wasm.js
git add -f .

git diff \
    --cached \
    --no-color \
    --ignore-space-at-eol \
    --no-ext-diff \
    --src-prefix=a/ \
    --dst-prefix=b/ \
    >$current_dir/go_wasm.patch

rm -rf $tmp_dir
