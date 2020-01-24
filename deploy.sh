rm -rf ../../tmp/public
cp -r build ../../tmp/public
cd ../../tmp
firebase deploy --only hosting
