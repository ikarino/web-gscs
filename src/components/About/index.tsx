import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      maxWidth: 600,
      paddingTop: theme.spacing(2),
      // paddingBottom: theme.spacing(2)
      marginBottom: theme.spacing(2)
    },
    heading: {
      padding: ".1em 0 .2em .75em",
      borderLeft: "6px solid #777",
      borderBottom: "1px solid #777"
    },
    heading2: {
      marginLeft: theme.spacing(1),
      padding: ".1em 0 .2em .75em",
      borderLeft: "6px solid #ccc",
      borderBottom: "1px solid #ccc"
    },
    panel: {
      width: "90%",
      margin: "auto",
      padding: theme.spacing(2)
    },
    infoPanel: {
      padding: theme.spacing(2)
    },
    body: {
      fontSize: "10pt",
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    code: {
      backgroundColor: "lightgray",
      fontWeight: "bold",
      marginRight: theme.spacing(0.5),
      marginLeft: theme.spacing(0.5)
    }
  })
);

export default function About() {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={4} className={classes.panel}>
        <Typography className={classes.heading}>web-gscsとは</Typography>
        <Typography variant="body1" className={classes.body}>
          ウェブブラウザ上でスモコンシミュレーションを行い、結果をシェアできるサービスです。
          <br />
          実機でスモコンする時代は終わりました。
        </Typography>
        <Typography className={classes.heading}>使い方</Typography>

        <Typography variant="body1" className={classes.body}>
          大きく分けて4種類の機能があります。
        </Typography>
        <ul>
          <li>
            <span className={classes.code}>Run</span>
            スモコン計算・投稿・保存機能
          </li>
          <li>
            <span className={classes.code}>Playground</span>スモコンお試し機能
          </li>
          <li>
            <span className={classes.code}>Records</span>投稿データ閲覧機能
          </li>
          <li>
            <span className={classes.code}>Local</span>保存データ閲覧機能
          </li>
        </ul>
        <Typography className={classes.heading2}>Run</Typography>
        <Typography variant="body1" className={classes.body}>
          スモコンの条件を入力し、計算を行うページです。
          <br />
          計算結果は個人用に保存したり、シェアするために投稿することができます。
          <br />
          <br />
          入力条件は大きく分けて3つあります。
        </Typography>
        <ul>
          <li>
            <b>Fieldパネル</b>: 仲間や壁の配置
          </li>
          <li>
            <b>Friendパネル</b>: 仲間の種族や能力設定
          </li>
          <li>
            <b>Configパネル</b>: 全体的な条件
          </li>
        </ul>
        <Typography variant="body1" className={classes.body}>
          <b>Resultパネル</b>
          の計算開始ボタンを押すことで、シミュレーションがスタートします。
          <br />
          計算結果は進捗に合わせてパネル内で更新表示されていきます。
          <br />
          <br />
          計算が終わると、<b>保存</b>または<b>投稿</b>ができるようになります。
          <br />
          <br />
          <b>保存</b>されたデータは<span className={classes.code}>Local</span>
          から閲覧できるようになります。
          データが公開されることはなく、ブラウザ内に保存されます。このため、キャッシュの削除によってデータが失われる可能性があります。
          <br />
          <br />
          <b>投稿</b>されたデータは公開され、
          <span className={classes.code}>Records</span>
          から閲覧できるようになります。データが消去されることはありません。
          <br />
          投稿には以下の条件があります。
        </Typography>
        <ul>
          <li>ログインしていること</li>
          <li>確率設定を変更していないこと</li>
        </ul>

        <Typography className={classes.heading2}>Playground</Typography>
        <Typography variant="body1" className={classes.body}>
          <span className={classes.code}>Run</span>
          の入力条件で、スモコンがどのように進行するか確認することができます。
          <br />
          <br />
          ユニットごとに行動後の状態が表示されるため、敵スモグルがたまりやすい場所等を前もって確認できます。
          <br />
          チューニングに使用してください。
        </Typography>

        <Typography className={classes.heading}>実装内容</Typography>
        <Typography variant="body1" className={classes.body}>
          SCSは実機スモコンを可能な限り忠実にシミュレーションするように作成しています。
        </Typography>

        <Typography className={classes.heading2}>
          特技が実装されているモンスター
        </Typography>
        <ul>
          <li>キラーマシン／さそりかまきり</li>
          <li>ホイミスライム</li>
          <li>おばけキノコ</li>
          <li>メイジももんじゃ</li>
          <li>ハエまどう／はねせんにん</li>
          <li>フライングデビル／ランガー／キングマーマン</li>
          <li>ミステリードール／いしにんぎょう</li>
          <li>スライムブレス／ドラゴスライム／ドラゴメタル</li>
          <li>リリパット／ドックスナイパー</li>
          <li>ドラゴン</li>
        </ul>

        <Typography className={classes.heading2}>確率</Typography>
        <Typography variant="body1" className={classes.body}>
          <a href="https://w.atwiki.jp/toruneko3/">トルネコ3異世界wiki</a>
          等の値を参考にしています。
          <br />
          デフォルト値は<span className={classes.code}>Run</span>の
          <b>Configパネル</b>から確認してください。
        </Typography>

        <Typography className={classes.heading2}>分裂方向</Typography>
        <Typography variant="body1" className={classes.body}>
          <a href="https://twitter.com/neko3mpota">@neko3mpota</a>さんの発見した
          <a href="https://twitter.com/neko3mpota/status/970271526703349760/photo/1">
            法則
          </a>
          を実装しています。
        </Typography>

        <Typography className={classes.heading}>開発・連絡</Typography>
        <Typography variant="body1" className={classes.body}>
          <a href="https://ofuse.me/">Ofuse</a>
          に登録して誰かからお小遣いもらおうかな～
        </Typography>
      </Paper>
    </Container>
  );
}
