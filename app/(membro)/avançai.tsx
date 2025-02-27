// src/screens/AulasScreen.tsx
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import { WebView } from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

type Aula = {
  titulo: string;
  videoUrl: string;
  descricao: string;
  imagem: any;
};

const reset: Aula[] = [
  {
    titulo: 'Lição 1 - Reconhecendo a Cristo como Senhor',
    videoUrl: 'https://www.youtube.com/embed/fuh3jtveqD4?si=1oVPbPYH3tYsPuPZ',
    descricao:
      `
<div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A experi&ecirc;ncia mais importante de sua vida &eacute; conhecer Jesus Cristo pessoalmente e relacionar- se com Ele. Jesus veio ao mundo para nos mostrar quem &eacute; Deus e como podemos conhec&ecirc;-lo. Se voc&ecirc; quer que o seu relacionamento com Cristo cres&ccedil;a, voc&ecirc; precisa conhec&ecirc;-lo melhor. Para isso &eacute; preciso compreender melhor quem Ele &eacute;, porqu&ecirc; Ele veio e o que Ele deseja fazer em sua vida.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">QUEM &Eacute; JESUS?</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Muitas pessoas tem uma vis&atilde;o distorcida ou limitada sobre Jesus. De acordo com as passagens abaixo, quem &eacute; Jesus?</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Mateus 16:16</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Colossenses 1:15-17</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">POR QUE JESUS VEIO?</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Nas passagens abaixo, quais s&atilde;o as raz&otilde;es da vinda de Cristo?</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Lucas 4:16-19</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Tim&oacute;teo 2:5-6</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Por que precisamos nos reconciliar com Deus?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Isa&iacute;as 59:2</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Romanos 3:23</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Pecado significa rebeli&atilde;o pessoal contra Deus e afastamento dos prop&oacute;sitos que ele tem para nossas vidas.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Qual foi a solu&ccedil;&atilde;o de Jesus para o pecado?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Romanos 5:8-9</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Pedro 3:18</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Atos 4:12</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Qual o resultado de sua morte?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; ll Cor&iacute;ntios 5:19-21</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Romanos 5:1-2</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Que prova temos n&oacute;s da sua ressurrei&ccedil;&atilde;o?</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Cor&iacute;ntios 15:3-8</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; Atos 10:40-41</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Quais s&atilde;o as raz&otilde;es da import&acirc;ncia de sua ressurrei&ccedil;&atilde;o?</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&radic; 1 Cor&iacute;ntios 15:13-18</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">SEU CONVITE</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Todos os que ouvem falar de Jesus devem tomar uma decis&atilde;o a respeito dEle e do que Ele fez por n&oacute;s. Ningu&eacute;m pode ficar neutro! Aceitamos a Cristo ou o rejeitamos. Ele nos chama para si.</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">NOSSA RESPOSTA</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para respondermos ao convite de Jesus e deix&aacute;-lo ser nosso Salvador e Senhor, &eacute; necess&aacute;rio que tomemos certas atitudes.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Embora Jesus tenha morrido pelos pecados de todo mundo, &eacute; preciso que haja uma resposta pessoal, individual para com Ele. Para nos relacionamentos com Ele, precisamos deixar nosso antigo modo de vida (arrependimento), precisamos confiar totalmente em Jesus para nossa salva&ccedil;&atilde;o (f&eacute;) e convid&aacute;-lo para fazer parte das nossas vidas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ao inv&eacute;s de um mero acordo intelectual repleto de ensinamentos sobre Jesus, isto significa um compromisso total de vida com Ele como Senhor. Este &eacute; o verdadeiro significado de tornar-se crente.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Como j&aacute; vimos, receber a Cristo &eacute; o come&ccedil;o de um relacionamento com Ele. Isto quer dizer que deve haver continuidade, deve haver crescimento para que haja significado real e satisfat&oacute;rio. Os cap&iacute;tulos seguintes deste estudo v&atilde;o tratar do desenvolvimento de seu relacionamento com Cristo.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">CONCLUS&Atilde;O</span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Lembre-se dos passos b&aacute;sicos para se tornar em crente:</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Crer que Jesus morreu por seus pecados e ressuscitou para justific&aacute;-lo diante de Deus</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Arrepender-se de seus pecados (admitindo a Deus que voc&ecirc; &eacute; pecador) e afastar-se deles.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Receber o perd&atilde;o de seus pecados a aceitar a Cristo como Salvador e Senhor de sua vida.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Confessar publicamente que Jesus &eacute; o Senhor (dono) de sua vida.</span></span></p>

<p>&nbsp;</p>

      `,
    imagem: require('@/assets/images/reset1.png'),
  },
  {
    titulo: 'Lição 2 - Conhecendo Jesus Cristo',
    videoUrl: 'https://www.youtube.com/embed/_xtmwkQtx6w?si=wob4bSq7fvzHLO0S',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Aceitar a Cristo &eacute; o come&ccedil;o de um novo relacionamento. O desejo de Deus &eacute; que cres&ccedil;amos neste relacionamento e que o conhe&ccedil;amos melhor. Para que possamos crescer n&oacute;s precisamos ter a certeza e seguran&ccedil;a de que o relacionamento &eacute; real e duradouro. Deus providenciou um meio para que tiv&eacute;ssemos esta certeza e seguran&ccedil;a sem precisarmos depender de sentimentos ou circunst&acirc;ncias. Ele providenciou sua palavra escrita e sua presen&ccedil;a conosco.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Quando come&ccedil;amos a conhecer a Cristo melhor, todo poder que era evidente em sua vida est&aacute; &agrave; nossa disposi&ccedil;&atilde;o. Pense nisso! Todo poder de Jesus Cristo est&aacute; dispon&iacute;vel para transformar nossas vidas completamente.</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">AM&Aacute;-LO COMPLETAMENTE</span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O amor &eacute; a chave para desenvolvimento de uma rela&ccedil;&atilde;o. Deus quer que o amemos de todo o nosso ser? (Dt. 6:5). Jesus repetiu este desejo e mandamento em Marcos 12:29-31.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A OBRA DO ESP&Iacute;RITO SANTO</strong></span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Jesus est&aacute; presente na vida dos crentes de um modo especial: atrav&eacute;s do Esp&iacute;rito Santo. O Esp&iacute;rito Santo concede o milagre do novo nascimento. Ele faz com que seja poss&iacute;vel conhecer a Cristo pessoalmente, e completa a obra de Cristo em nossas vidas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A palavra grega para Esp&iacute;rito Santo &eacute; <em>paracletos. </em>O seu significado &eacute; &ldquo;aquele que vai ao lado&rdquo;. Ela traduzida como ajudante, conselheiro, confortador, animador. Seu minist&eacute;rio em nossas vidas &eacute; absolutamente essencial.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ser cheio do Esp&iacute;rito Santo significa que Cristo tem o controle absoluto em todas as &aacute;reas de nossa vida (Romanos 8:5-6). Ser cheio do Esp&iacute;rito Santo deve significar uma experi&ecirc;ncia cont&iacute;nua, evidenciada por qualidades interiores e n&atilde;o necessariamente por sentimentos e experi&ecirc;ncias extasiantes.</span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px">CRESCER NO RELACIONAMENTO</span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Leia Jo&atilde;o 15:1-11.</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Como &eacute; que o crescimento se desenvolve?</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Deus pode nos ensinar muitas coisas, mesmo quando estamos cheios de d&uacute;vidas. Habacuque tinha s&eacute;rias d&uacute;vidas sobre a validade da presen&ccedil;a de Deus. Ele queria saber qual a posi&ccedil;&atilde;o de Deus num mundo t&atilde;o cheio de maldades. Deus se revelou a ele e Habacuque mudou sua maneira de encarar a presen&ccedil;a de Deus.</span></span></p>
</div>

      `,
    imagem: require('@/assets/images/reset2.png'),
  },
  {
    titulo: 'Lição 3 - Graça e Justificação',
    videoUrl: 'https://www.youtube.com/embed/thLa8h6v5pI?si=sfeiM59AyJ9vTAAj',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na hist&oacute;ria da cria&ccedil;&atilde;o compreendemos que Deus criou o homem para ser livre, feliz e aben&ccedil;oado. Por&eacute;m, j&aacute; refletimos que o pecado interrompeu este ciclo gerando aos homens consequ&ecirc;ncias desastrosas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Por&eacute;m, o mesmo amor que moveu Deus em criar o homem, &eacute; o mesmo que atrav&eacute;s de Jesus Cristo justifica esse mesmo homem do pecado manifestando a sua maravilhosa gra&ccedil;a.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A GRA&Ccedil;A E SUA MANIFESTA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A &uacute;ltima palavra de Deus ao homem n&atilde;o &eacute; o pecado, mas a gra&ccedil;a divina (Gn 3-21, 4.15) (Tito 2.11/ Rm 5.20b / ll Pe 1.2). Esta mesma gra&ccedil;a menciona que a resposta de Deus ao pecado foi o perd&atilde;o e o direito do homem em se libertar dos males do pecado.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Este processo se inicia quando analisamos que a principal a&ccedil;&atilde;o de Deus em n&atilde;o deixar o homem na mis&eacute;ria do pecado foi seu amor (1 Jo 4.16 / 1 Jo 4-19), e a maior prova desse amor foi enviar seu filho amado Jesus Cristo para morrer por n&oacute;s na cruz (Jo 3.16), nos redimindo, justificando e salvando na figura de Jesus Cristo que deixou sua gl&oacute;ria para nos purificar do pecado (Hb 1.3</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">/ Tito 2.14 / Col 1.14) e que atrav&eacute;s da f&eacute; Nele recebemos o maior presente que poder&iacute;amos ter de Deus, a certeza da vida eterna (Rm 3.24).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para entendermos um pouco da imensid&atilde;o do significado da palavra gra&ccedil;a, &eacute; importante dividi- la em duas partes:</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Gra&ccedil;a proveniente</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Esta gra&ccedil;a &eacute; a a&ccedil;&atilde;o de Deus, antes da nossa decis&atilde;o em nos render a Ele. O texto de 1 Jo 4.19, expressa que n&oacute;s amamos porque Ele nos amou primeiro, sendo assim, j&aacute; entendemos que a nossa decis&atilde;o &eacute; uma resposta da gra&ccedil;a divina que j&aacute; opera em n&oacute;s mostrando que Deus sempre d&aacute; o primeiro passo em nossa dire&ccedil;&atilde;o atrav&eacute;s do seu infinito amor. Por&eacute;m, devemos sintetizar que a B&iacute;blia tamb&eacute;m nos ensina que mesmo com esta a&ccedil;&atilde;o, muitos homens por sua dureza de cora&ccedil;&atilde;o ignoram esta gra&ccedil;a (Ef 4.18) seguindo suas pr&oacute;prias convic&ccedil;&otilde;es e valores.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Gra&ccedil;a justificadora</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Esta gra&ccedil;a tamb&eacute;m &eacute; uma a&ccedil;&atilde;o de Deus (Rm 3.24), mas depende de n&oacute;s aceitarmos ou n&atilde;o. Se a nossa resposta for positiva e cumprirmos princ&iacute;pios da B&iacute;blia Sagrada. Nosso Pai nos considerar&aacute; justificados por meio de Jesus Cristo, e isto, &eacute; o que chamamos de justifica&ccedil;&atilde;o.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A JUSTIFICA&Ccedil;&Atilde;O E O SER HUMANO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A justifica&ccedil;&atilde;o pode ser definida de m&uacute;ltiplas formas, por&eacute;m a que mais se assemelha ao benef&iacute;cio que ela nos traz &eacute; a liberdade da culpa e do castigo do pecado. Tal manifesta&ccedil;&atilde;o &eacute; evidenciada no sacrif&iacute;cio de Jesus Cristo por n&oacute;s na cruz, trazendo a evidencia de que n&atilde;o pode haver remiss&atilde;o e aplica&ccedil;&atilde;o de Justi&ccedil;a de Deus sem o sangue de Cristo (Hb 9.22 e Rm 3.26.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Este direito de Justifica&ccedil;&atilde;o foi resgatado por Cristo, trazendo a id&eacute;ia de que Deus criou o homem bom (Gn 1.27) por&eacute;m sua desobedi&ecirc;ncia o levou ao pecado, violando a lei de Deus, comprometendo toda sua descend&ecirc;ncia (Ec 7.29). Jesus Cristo veio na figura de um segundo Ad&atilde;o para resgatar tudo o que Deus criou de bom e justificar o pecado pela sua gra&ccedil;a (Rm 3.24), em resumo, por um homem o pecado entrou no mundo (Ad&atilde;o) e por um s&oacute; homem a salva&ccedil;&atilde;o veio ao mundo (Jesus Cristo) (Rm 5.12-19 / ll Co 5.21).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O FRUTO DA JUSTIFICA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A justifica&ccedil;&atilde;o &eacute; adquirida pela f&eacute; em Jesus Cristo e n&atilde;o pelas obras que a pessoa realiza antes da convers&atilde;o. Quando somos justificados por meio de Jesus Cristo (Gl 2.16), um fruto &eacute; desenvolvido em n&oacute;s, o qual Deus se agrada, &eacute; o fruto da santifica&ccedil;&atilde;o. Esse fruto opera em n&oacute;s pelo Esp&iacute;rito Santo de Deus mudando nosso interior e manifestando o desejo de pensar e de tomar a&ccedil;&otilde;es que agradam o cora&ccedil;&atilde;o de Deus!</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s de Jesus Cristo, o amor de Deus foi enraizado novamente na cria&ccedil;&atilde;o. A desobedi&ecirc;ncia que um dia gerou desgra&ccedil;a &agrave; humanidade atrav&eacute;s de Ad&atilde;o, foi resgatada atrav&eacute;s de Jesus Cristo. Anunciemos esta gra&ccedil;a para que a salva&ccedil;&atilde;o, justifica&ccedil;&atilde;o e santifica&ccedil;&atilde;o cheguem a todos de nossa fam&iacute;lia, amigos, bairro, cidade, pa&iacute;s e mundo.</span></span></p>

      `,
    imagem: require('@/assets/images/reset3.png'),
  },
    {
    titulo: 'Lição 4 - O Pecado e o Arrependimento',
    videoUrl: 'https://www.youtube.com/embed/ARZyyOPEGAQ?si=pnOBMeIpOlpMJWhR',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Deus criou o homem a sua imagem e semelhan&ccedil;a (Gn 2.7-17) (Gn 1.26-27) e harmonizou o mundo para que ele visse em plena felicidade. Deus deu liberdade, autoridade e estabeleceu limites para que o homem obedecesse. Por&eacute;m esse homem transgrediu este limite (Gn 3.1-6), ferindo sua rela&ccedil;&atilde;o com a natureza, com o seu pr&oacute;ximo, consigo mesmo e principalmente com Deus.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O PECADO E SUA NATUREZA</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O pecado &eacute; qualquer ato, palavra ou inten&ccedil;&atilde;o que transgrida a vontade de Deus (Tg 4.16-17). Cometer um pecado &eacute; ir contra a santa e boa lei de Deus (1 Jo 3.4).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Algumas defini&ccedil;&otilde;es n&atilde;o esgotam o sentido do pecado, por&eacute;m entendemos melhor quando analisamos o livro b&iacute;blico de G&ecirc;nesis no cap&iacute;tulo 3, onde Ad&atilde;o e Eva foram criados em estado de inoc&ecirc;ncia, por&eacute;m pecaram quando desobedeceram a Deus e comeram do fruto da &aacute;rvore do conhecimento do bem e do mal (Gn 3.5). Em resumo, o pecado se caracterizou quando o ser humano quis ser igual a Deus. E &eacute; &oacute;bvio que foi um insucesso, manifestando gan&acirc;ncia, rebeldia, desobedi&ecirc;ncia, ang&uacute;stia, mentira, idolatria, etc.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Devido ao ato de desobedi&ecirc;ncia praticado por Ad&atilde;o e Eva, toda humanidade foi afetada pelo pecado (Rm 5.19), e a Morte Eterna (Rm 5.12-21). Tal afirma&ccedil;&atilde;o &eacute; conhecida pelos te&oacute;logos como Pecado Original.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Em Romanos 3.23, o ap&oacute;stolo Paulo descreve o estado dos homens, ap&oacute;s o Pecado Original, fomos destitu&iacute;dos da Gl&oacute;ria de Deus. Por&eacute;m Deus oferece gra&ccedil;a &agrave; todos, e por meio da f&eacute; em Jesus Cristo os pecados podem ser perdoados. Tal f&eacute; opera no cora&ccedil;&atilde;o do ser humano, a ponto dele nascer de novo em Cristo, transformando sua maneira de ver o mundo, ou seja, em Jesus Cristo todos podem ser uma nova criatura!</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>COMPREENS&Atilde;O DO ARREPENDIMENTO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A B&iacute;blia relata sobre a vida de um homem que antecedeu o minist&eacute;rio de Jesus, seu nome &eacute; Jo&atilde;o Batista. Ele proclamava &agrave;s pessoas o arrependimento dos seus pecados (Mc 1.1-4). Ap&oacute;s&nbsp;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">este an&uacute;ncio Jesus estabeleceu seu minist&eacute;rio na terra oferecendo n&atilde;o apenas a busca pelo arrependimento, mas na certeza que esse arrependimento salvarias as pessoas atrav&eacute;s do Seu nome (1 Jo 3.7) (2 Co 7.9 / Atos 5.31) e devolveria a pureza de cora&ccedil;&atilde;o aos homens (1 Jo 3.3)</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O arrependimento o ponto de partida para a pratica de vida crist&atilde; onde os primeiros passos s&atilde;o guiados por Jesus Cristo atrav&eacute;s de Sua palavra (Gl 4.3) (Gl 2.20), andando em rumo a maturidade crist&atilde; (1 Pe 2.2).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O sentimento de arrependimento genu&iacute;no &eacute; caracterizado quando a tristeza por causa do pecado (2 Co 7.9) (2 Co 7.9-10) nos d&aacute; a sensa&ccedil;&atilde;o de estarmos distante de Deus. O arrependimento &eacute; uma mudan&ccedil;a de cora&ccedil;&atilde;o consequentemente de vida. Devemos entender que a decis&atilde;o de usufruir deste benef&iacute;cio (arrependimento) &eacute; pessoal (Rm 6.1-4). A gra&ccedil;a de Deus em Cristo precisa ser aceita por n&oacute;s a cada dia por meio de um genu&iacute;no arrependimento. Temos o livre arb&iacute;trio, isto &eacute;, a liberdade de escolher e aceitar essa gra&ccedil;a, e vivermos novamente a comunh&atilde;o e a harmonia com o Criador.)</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A trajet&oacute;ria de pecado tem sido uma pr&aacute;tica da humanidade. Mesmo Jesus Cristo se manifestando ao mundo, o homem continua sendo incr&eacute;dulo quanto a Deus e seu amor. Por&eacute;m, nossa miss&atilde;o &eacute; dar continuidade na miss&atilde;o de Jesus Cristo, pregando e vivendo o verdadeiro evangelho para estabelecer o Reino dos c&eacute;us na terra.</span></span></p>

      `,
    imagem: require('@/assets/images/reset4.png'),
  },
  {
    titulo: 'Lição 5 - Princípíos da Oração',
    videoUrl: 'https://www.youtube.com/embed/ENu07d8zIZA?si=qQewKnMmX8U7oZUB',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Muitas coisas s&atilde;o importantes na vida de um crist&atilde;o, por&eacute;m outras s&atilde;o mais que importantes, s&atilde;o vitais. Dentre essas coisas vitais, encontramos a ora&ccedil;&atilde;o.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Segue abaixo algumas frases ditas a respeito da ora&ccedil;&atilde;o ao longo da hist&oacute;ria:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;Satan&aacute;s ri de nosso zelo no servi&ccedil;o, zomba de nossa sabedoria, mas treme quando oramos.&rdquo;</em></span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;Muita ora&ccedil;&atilde;o secreta resulta em muito poder em p&uacute;blico.&rdquo;</em></span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;A ora&ccedil;&atilde;o do crente fiel tem p&eacute; e anda, tem asas e voa at&eacute; chegar no c&eacute;u.&rdquo;</em></span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><em>&ldquo;Nunca ocupamos posi&ccedil;&atilde;o t&atilde;o elevada como quando estamos de joelho.&rdquo;</em></span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; A ORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ora&ccedil;&atilde;o &eacute; a comunica&ccedil;&atilde;o e o fruto consciente do relacionamento com Deus durante a qual a pessoa louva, agradece, intercede pela vida de outro, pede b&ecirc;n&ccedil;&atilde;os para ele ou a outrem, e atrav&eacute;s dela pode desfrutar da presen&ccedil;a de Deus. As ora&ccedil;&otilde;es s&atilde;o dirigidas &agrave; Deus, por media&ccedil;&atilde;o &uacute;nica de Jesus Cristo, e podem ser feitas em voz alta, falada, em can&ccedil;&atilde;o ou em sil&ecirc;ncio. O prop&oacute;sito da ora&ccedil;&atilde;o (Mt 6.5-13) n&atilde;o seria o de alterar a vontade de Deus, mas de obter para si mesmo e/ou para os outros b&ecirc;n&ccedil;&atilde;os e gra&ccedil;a que Deus j&aacute; estaria disposto a conceder. Ora&ccedil;&atilde;o &eacute; a comunica&ccedil;&atilde;o e o fruto consciente do relacionamento com Deus durante a qual a pessoa louva, agradece, intercede pela vida de outro, pede b&ecirc;n&ccedil;&atilde;os para ele ou a outrem, e atrav&eacute;s dela pode desfrutar da presen&ccedil;a de Deus. As ora&ccedil;&otilde;es s&atilde;o dirigidas &agrave; Deus, por media&ccedil;&atilde;o &uacute;nica de Jesus Cristo, e podem ser feitas em voz alta, falada, em can&ccedil;&atilde;o ou em sil&ecirc;ncio. O prop&oacute;sito da ora&ccedil;&atilde;o (Mt 6.5-13) n&atilde;o seria o de alterar a vontade de Deus, mas de obter para si mesmo e/ou para os outros b&ecirc;n&ccedil;&atilde;os e gra&ccedil;a que Deus j&aacute; estaria disposto a conceder.</span></span></p>

<p style="margin-left:64.1pt">&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>NECESSIDADE DA ORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Em diversas passagens dos evangelhos, encontramos relatos que Jesus constantemente orava ao Pai. Ele orava pela manh&atilde; (Marcos 1.35), &agrave; tarde (Mateus 14.23) e passava noites inteiras em comunh&atilde;o com Deus (Lucas 6.12). Se Jesus, que era o pr&oacute;prio Filho de Deus tinha essa pr&aacute;tica, &eacute; &oacute;bvio que devemos estabelecer essa rotina no nosso dia-a-dia. Quanto mais conversarmos com algu&eacute;m, mais nos aproximamos dessa pessoa e temos mais intimidade com ela, da mesma forma &eacute; com o Senhor. Al&eacute;m de poderosa (Tiago 5.16), atrav&eacute;s da ora&ccedil;&atilde;o estabelecemos um di&aacute;logo com Deus, aprofundando a nossa comunh&atilde;o e intimidade atrav&eacute;s do Esp&iacute;rito Santo (Romanos 8.26-27). Tamb&eacute;m apresentamos a Ele as nossas ansiedades, desejos e necessidades, &ldquo;e Deus nos conceder&aacute; a paz que excede todo o entendimento e guardar&aacute; em Cristo Jesus os nossos cora&ccedil;&otilde;es e mentes&rdquo;. (Fp 4.6-7).</span></span></p>

<p style="margin-left:64.1pt">&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>FRUTOS DE UMA VIDA DE ORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>a) Conseguimos sabedoria</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Tiago 1.5</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Se algum de voc&ecirc;s tem falta de sabedoria, pe&ccedil;a-a a Deus, que a todos d&aacute; livremente, de boa vontade; e lhe ser&aacute; concedida...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>b) Movemos a m&atilde;o de Deus;</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Mateus 7.7-8</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Pe&ccedil;am, e lhes ser&aacute; dado; busquem, e encontrar&atilde;o; batam, e a porta lhes ser&aacute; aberta. Pois tudo o que pede, recebe; o que busca, encontrar&aacute;; e &agrave;quele que bate, a porta ser&aacute; aberta...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>c) Nos tornamos intercessores;</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute;f&eacute;sios 6. 18-20</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Orem no Esp&iacute;rito em todas as ocasi&otilde;es, com toda ora&ccedil;&atilde;o e s&uacute;plica; tendo isso em mente, estejam atentos e perseverem na ora&ccedil;&atilde;o por todos os santos. Orem tamb&eacute;m por mim, para que, quando eu falar, seja-me dada a mensagem a fim de que, destemidamente, torne conhecido o mist&eacute;rio do evangelho, pelo qual sou embaixador preso em correntes. Orem para que, permanecendo nele, eu fale com coragem, como me cumpre fazer...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>d) Caminhamos em rumo a santidade;</em></strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">1 Tim&oacute;teo 4.4</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;... Pois tudo o que Deus criou &eacute; bom, e nada deve ser rejeitado, se for recebido com a&ccedil;&atilde;o de gra&ccedil;as, pois &eacute; santificado pela palavra de Deus e pela ora&ccedil;&atilde;o...&rdquo;</span></span></p>

<p>&nbsp;</p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>e) Deus estabelece o seu avivamento;</strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Atos 4.31</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;...Depois de orarem, tremeu o lugar em que estavam reunidos; todos ficaram cheios do Esp&iacute;rito Santo e anunciavam corajosamente a palavra de Deus...&rdquo;</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>COMO E QUANDO DEVEMOS ORAR?</strong></span></span></h2>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Nossas&nbsp;&nbsp;&nbsp;&nbsp; ora&ccedil;&otilde;es&nbsp;&nbsp;&nbsp;&nbsp; devem&nbsp;&nbsp;&nbsp;&nbsp; ser&nbsp;&nbsp;&nbsp;&nbsp; feitas&nbsp;&nbsp;&nbsp; em&nbsp;&nbsp;&nbsp;&nbsp; nome&nbsp;&nbsp;&nbsp;&nbsp; de&nbsp;&nbsp;&nbsp; Jesus.&nbsp;&nbsp;&nbsp;&nbsp; (Jo&atilde;o&nbsp;&nbsp;&nbsp;&nbsp; 14.13-14)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">A nossa ora&ccedil;&atilde;o deve ser feta segundo a vontade de Deus (Mateus 6.10), a sua vontade ser&aacute; sempre boa, agrad&aacute;vel e perfeita (Rm 12.2b).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Precisamos estar em comunh&atilde;o com Deus para que nossas ora&ccedil;&atilde;o sejam atendidas (Jo 15.7 / l Jo 3.22).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Devemos orar sem cessar ( l Ts 5.17 / Cl 4.2 / Sl 40.1 / Ef 6.18 / Lc 18.1-8).</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/reset5.png'),
  },
  {
    titulo: 'Lição 6 - Batismo',
    videoUrl: 'https://www.youtube.com/embed/mzPPMX60c4g?si=g4Dbbn4OMfXjMVQD',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas cerim&ocirc;nias ordenadas por Cristo para que os crist&atilde;os pratiquem: O Batismo em &aacute;gua e a Ceia do Senhor.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A palavra batismo tem muitos significados, dentre eles:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Imerso, mergulho, lavado, limpo com &aacute;gua (W. C. Taylor).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Cerim&ocirc;nia em que se usa &aacute;gua por meio da qual uma pessoa se torna membro de uma igreja crist&atilde; (Dicion&aacute;rio Jo&atilde;o Ferreira de Almeida).</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Uma ordenan&ccedil;a crist&atilde;; banho com &aacute;gua simbolizando a limpeza dos pecados, unido ao arrependimento e admiss&atilde;o na comunidade dos fi&eacute;is (Dicion&aacute;rio Dake).</span></span></li>
</ol>

<p><span style="color:#FFFFFF"><span style="font-size:18px">De todos os significados mais conhecidos, o grande consenso que existe nas igrejas crist&atilde;s evang&eacute;licas &eacute; que o batismo em &aacute;gua &eacute; um ato ou confiss&atilde;o p&uacute;blica de arrependimento e f&eacute; em Jesus Cristo, em que a pessoa declara publicamente que morreu para o mundo (sistema mundano) e ressuscitou para Deus.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>REQUISITOS PARA O BATISMO</strong></span></span></h2>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Crer em Jesus (Marcos 16.16)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Arrependimento (Atos 2.38)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Confessar os seus pecados (Marcos 1.5 / Mateus 3.6)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Desejo de ser batizado (Atos 2.37-41)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Responsabilidade pelos seus atos em consci&ecirc;ncia do batismo (Atos 2.41 / Hebreus 10.22)</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O PORQU&Ecirc; DO BATISMO</strong></span></span></h2>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque &eacute; uma demonstra&ccedil;&atilde;o de obedi&ecirc;ncia ao Senhor (Mateus 28.19)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque o pr&oacute;prio Jesus se batizou (Mateus 3.16)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque precisamos dar testemunho p&uacute;blico perante a igreja e o mundo da mudan&ccedil;a de car&aacute;ter que conquistamos atrav&eacute;s de B&iacute;blia Sagrada (ll Cor&iacute;ntios 5.17 / G&aacute;latas 3.27)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Porque nos livros do Novo Testamento encontramos cerca de 70 refer&ecirc;ncias &agrave; pratica do batism</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>M&Eacute;TODOS</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Imers&atilde;o: </strong>Lavagem de todo o corpo</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Aspers&atilde;o: </strong>Lavagem de partes do corpo</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Embora n&atilde;o tenhamos nenhuma refer&ecirc;ncia b&iacute;blica clara sobre o m&eacute;todo que devemos usar, a CRIEP tem como regra o batismo por imers&atilde;o, simbolizando a morte da velha criatura e o renascimento de uma nova criatura. (ll Cor&iacute;ntios 5.17; Mateus 3.16).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong><em>Observa&ccedil;&atilde;o: </em></strong>Quando n&atilde;o &eacute; poss&iacute;vel a imers&atilde;o por algum motivo de sa&uacute;de, a lideran&ccedil;a da igreja opta pela aspers&atilde;o.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>MOMENTO CERTO PARA O BATISMO DE ALGU&Eacute;M</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na &eacute;poca do Antigo Testamento as crian&ccedil;as eram apresentadas ao Senhor (Lucas 2.22), e aos 12 anos (idade em que se considera iniciar-se o processo de consci&ecirc;ncia) eram entregues ao Templo para aprender os ensinos e tradi&ccedil;&otilde;es judaicas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Por esse motivo, que muitos pais crist&atilde;os aconselham a seus filhos serem batizados a partir dos 12 anos, pois entendem que &eacute; necess&aacute;rio terem responsabilidade pelos seus atos e consci&ecirc;ncia dos mesmos. Por isso que n&oacute;s da CRIEP n&atilde;o batizamos crian&ccedil;as, visto que elas ainda n&atilde;o s&atilde;o respons&aacute;veis pelos seus atos e decis&otilde;es.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>PORQUE N&Atilde;O PODEMOS DEIXAR DE NOS BATIZAR?</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Porque o batismo nos identifica com Cristo:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Na morte &ldquo;Fomos batizados na sua morte.&rdquo; (Romanos 6.3)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">No sepultamento: &ldquo; Tendo sido sepultados juntamente com Ele no batismo...&rdquo; (CL 2.12/ RM 6.4)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Na resurrei&ccedil;&atilde;o: &ldquo; Portanto, se fostes ressuscitados juntamente com Cristo...&rdquo; (Colossenses 3.1) &ldquo;...tamb&eacute;m seremos semelhantes na sua ressurrei&ccedil;&atilde;o&rdquo; (Romanos 6.5).</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>QUEM PODE REALIZAR A CERIM&Ocirc;NIA DO BATISMO?</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na RARA, cremos no sacerd&oacute;cio de todos os crentes (l Pedro 2.9), ou seja, todos aqueles que j&aacute; fazem parte da fam&iacute;lia de Deus por meio do batismo, podem realizar a cerim&ocirc;nia. Por&eacute;m, como forma organizacional, estabelecemos essa responsabilidade aos presb&iacute;teros, evangelistas e pastores da nossa comunidade, ou algu&eacute;m nomeado pelo corpo ministerial.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s do batismo a pessoa d&aacute; um testemunho p&uacute;blico de sua identifica&ccedil;&atilde;o com Cristo. &Eacute; o sinal exterior que representa a morte para o mundo e a ressurrei&ccedil;&atilde;o para Deus. Cada um de n&oacute;s repete de modo espiritual, o que aconteceu com Cristo. Ele morreu e ressuscitou. Assim, pelo batismo, n&oacute;s provamos que somos vitoriosos por meio de Jesus Cristo.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Se voc&ecirc; est&aacute; realizando esse curso, sinta-se privilegiado por essas informa&ccedil;&otilde;es que voc&ecirc; acabou de receber. Pense bem, e se voc&ecirc; desejar tome a decis&atilde;o de se batizar, e acredite uma vida abundante voc&ecirc; ter&aacute; em Jesus Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/reset6.png'),
  },
  {
    titulo: 'Lição 7 - Santificação',
    videoUrl: 'https://www.youtube.com/embed/6BoZ8MQh_P8?si=7yWKmlks8-geWSuI',
    descricao:
      `
      <h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A santifica&ccedil;&atilde;o &eacute; o est&aacute;gio posterior ao da justifica&ccedil;&atilde;o e cont&iacute;nuo, sua pr&aacute;tica di&aacute;ria &eacute; fundamental para estruturar nosso relacionamento com Deus, estabelecendo assim, o Reino de Deus em nossa vida e na vida de outras pessoas.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCEITO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O conceito da palavra santifica&ccedil;&atilde;o significa a separa&ccedil;&atilde;o das pr&aacute;ticas mundanas em todos os sentidos da vida. Este processo caracteriza-se em levar o crist&atilde;o a ser mais dedicado e comprometido com os padr&otilde;es b&iacute;blicos espirituais, morais e comportamentais.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O texto de Hebreus 12.14 nos evidencia que o primeiro est&aacute;gio da santifica&ccedil;&atilde;o &eacute; a sensa&ccedil;&atilde;o de paz, a qual precisamos ter para vermos a Deus. A B&iacute;blia em sua rica instru&ccedil;&atilde;o nos ensina que os principais objetivos em se santificar, implicam em agradar a Deus em nossas pr&aacute;ticas di&aacute;rias, estando sempre preparadas a servir a Deus de maneira &iacute;ntegra e s&oacute;lida.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para que o Reino de Deus seja estabelecido na vida de uma pessoa, a santifica&ccedil;&atilde;o se torna um pr&eacute; - requisito. Isso implica uma ren&uacute;ncia di&aacute;ria do nosso &ldquo;eu&rdquo; deixando aquilo que n&atilde;o agrada a Deus e buscando sua vontade. O texto de 1 Ts 4.7m nos revela que a santifica&ccedil;&atilde;o &eacute; mais do que uma decis&atilde;o pessoal e intransfer&iacute;vel de viver a sua palavra, mas &eacute; tamb&eacute;m um chamado de Deus. Ap&oacute;s a escolha do Senhor em nos amar (Ef 1.4), Ele mesmo tem o interesse de nos moldar para sermos vasos &uacute;teis e santificados, sendo eficientes para a boa obra (2 Tm 2.21).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>FONTES DE SANTIFICA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Muitos usam seus gostos e ideologias pessoais para oferecer padr&otilde;es de santidade. Por&eacute;m a CRIEP acredita em tr&ecirc;s padr&otilde;es fundamentais:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Jesus Cristo</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Em Cristo Jesus, o qual se tornou, da parte de Deus, sabedoria, e justi&ccedil;a, e santifica&ccedil;&atilde;o e reden&ccedil;&atilde;o&rdquo; (l Cor&iacute;ntios 1.30).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Nessa vontade &eacute; que temos sido santificados, mediante a oferta do corpo de Jesus Cristo, uma vez por todas&rdquo; (Hebreus 10.10).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Esp&iacute;rito Santo</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Para que eu seja ministro de Cristo Jesus entre os gentios &ldquo;... uma vez santificado pelo Esp&iacute;rito Santo&rdquo; (Romanos 15.16).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Tais fostes alguns de v&oacute;s vos lavastes, mas fostes santificados, mas fostes justificados em nome do Senhor Jesus e no Esp&iacute;rito do nosso Deus&rdquo; (l Cor&iacute;ntios 6.11).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Deus vos escolheu desde o princ&iacute;pio para a salva&ccedil;&atilde;o, pela santifica&ccedil;&atilde;o do Esp&iacute;rito e f&eacute; na verdade&rdquo; (ll Tessaloniceses 2.13).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.B&iacute;blia Sagrada</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Santifica-vos na verdade, a tua palavra &eacute; a verdade&rdquo; (Jo&atilde;o 17.17).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Por que a Palavra de Deus &eacute; viva, e eficaz, e mais cortante do que qualquer espada de dois gumes, e penetra at&eacute; o ponto alma e esp&iacute;rito...&rdquo; (Hebreus 4.12).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Guardo no cora&ccedil;&atilde;o as tuas palavras para n&atilde;o pecar contra ti&rdquo; (Salmo 119.11).</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Aacute;REAS DA SANTIFICA&Ccedil;&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O ser humano &eacute; constitu&iacute;do de corpo, alma e esp&iacute;rito (l Tessalonicenses 5.23). E essas tr&ecirc;s &aacute;reas devem ser submetidas ao processo de santifica&ccedil;&atilde;o.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Corpo</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Devemos santificar e glorificar a Deus com todos os membros do nosso corpo, pois ele &eacute; a morada do Esp&iacute;rito de Deus (l Cor&iacute;ntios 3.16-17 e l Cor&iacute;ntios 6.20).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Alma</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Devemos n&atilde;o apenas santificar o nosso corpo, mas tamb&eacute;m nossos pensamentos, sentimentos, vontades, motiva&ccedil;&otilde;es e desejos (Atos 24.16 / ll Cor&iacute;ntios 1.12).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Esp&iacute;rito</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O esp&iacute;rito &eacute; a heran&ccedil;a divina que Deus soprou em n&oacute;s, por&eacute;m com o Pecado Original, esse esp&iacute;rito foi enfraquecido. N&atilde;o &eacute; &agrave; toa que Deus atrav&eacute;s de Jesus Cristo soprou sobre sua Igreja o Esp&iacute;rito Santo, para fortalecer o seu elo com o ser humano. (l Pedro 1.2)</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Que em todo tempo possamos estar comprometidos em nos tornar pessoas mais santas. N&atilde;o uma santifica&ccedil;&atilde;o aparente e demag&oacute;gica, mas uma santifica&ccedil;&atilde;o que venha ser gerada no &iacute;ntimo do nosso cora&ccedil;&atilde;o e frutificada em todas as nossas palavras e atitudes.</span></span></p>

      `,
    imagem: require('@/assets/images/reset7.png'),
  },
  {
    titulo: 'Lição 8 - Ceia do Senhor',
    videoUrl: 'https://www.youtube.com/embed/x3fofsEiiyw?si=FIftDDd3vgLngjsP',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas ordenan&ccedil;as estabelecidas por Jesus Cristo O Batismo em &aacute;gua, que vimos na aula passada, e a Ceia do Senhor (Eucaristia).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O termo &ldquo;eucaristia&rdquo; a partir dos relatos das comunidades crist&atilde;s dando in&iacute;cio no primeiro s&eacute;culo significativa &ldquo;o partir do p&atilde;o&rdquo;. Ou seja, o oferecimento de a&ccedil;&atilde;o de gra&ccedil;as a Deus sobre o p&atilde;o e o vinho na refei&ccedil;&atilde;o cerimonial da igreja.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; A CEIA DO SENHOR OU EUCARISTIA?</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Eacute; a celebra&ccedil;&atilde;o mais solene da Igreja, que tem por finalidade um duplo an&uacute;ncio (l Cor&iacute;ntios 11.26):</strong></span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">An&uacute;ncio da morte de Jesus para nos livrar da morte eterna.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">An&uacute;ncio da sua volta gloriosa.</span></span></li>
</ol>

<p><span style="color:#FFFFFF"><span style="font-size:18px">A Ceia &eacute; constitu&iacute;da por dois elementos: o p&atilde;o e o vinho. O p&atilde;o simboliza o corpo de Cristo. &ldquo;Tomai, comei, isto &eacute; o meu corpo&rdquo; ( l Co 11.24). O vinho simboliza o sangue de Cristo. &ldquo;Isto &eacute; o meu sangue&rdquo; ( l Co 11.25).</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Existem nas igrejas crist&atilde;s tr&ecirc;s tipo de ensino:</strong></span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Transubstancia&ccedil;&atilde;o</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; a ideia prevalecente na igreja cat&oacute;lica, de que, ao serem consagrados, os elementos se tornam verdadeiramente corpo e sangue de Cristo. Cr&ecirc;-se que a h&oacute;stia nas m&atilde;os do sacerdote (padre se transforma integralmente no corpo e sangue de Jesus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Consubstancia&ccedil;&atilde;o</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Os adeptos da consubstancia&ccedil;&atilde;o ensinam que a partir do momento que o sacerdote (pastor) faz a ora&ccedil;&atilde;o de consagra&ccedil;&atilde;o, al&eacute;m de permanecerem p&atilde;o e vinho, tamb&eacute;m se transformam no corpo e sangue de Jesus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Ato memorial &ndash; No que acreditamos</strong></span></span></h3>
</div>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Em muitas igrejas evang&eacute;licas, inclusive na RARA, entendemos pela Palavra de Deus, que a Ceia &eacute; um memorial, pois ao instituir essa ordenan&ccedil;a Jesus disse: &ldquo;Fazei isto em mem&oacute;ria de mim&rdquo; (l Co 11.24,25).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A CEIA EM RELA&Ccedil;&Atilde;O &Agrave; IGREJA</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Quando participamos da Ceia significa que a Igreja vive num s&oacute; corpo, num s&oacute; esp&iacute;rito, numa s&oacute; f&eacute;, num s&oacute; pensamento (Ef&eacute;sios 4.4-6).</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Na CRIEP, todo m&ecirc;s h&aacute; pelo menos um culto da Ceia. Esse culto n&atilde;o foi ideia de um homem ou mulher, mas como vimos, foi institu&iacute;do por Jesus. Esta &eacute; uma cerim&ocirc;nia espiritual, na qual os crentes devem participar em atitude solene, meditativa e reverente. N&atilde;o apenas com apar&ecirc;ncia de santidade, mas como um pecador arrependido, anunciando que Ele morreu, ressuscitou e em breve voltar&aacute;.</span></span></p>

      `,
    imagem: require('@/assets/images/reset8.png'),
  },
  {
    titulo: 'Lição 9 - Vícios',
    videoUrl: 'https://www.youtube.com/embed/1w0_5drOyKM?si=kWgpvMpfRa1hFkIh',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Romanos 8:5-6</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Porque os que se inclinam para a carne, cogitam das coisas da carne, mas os que se inclinam para o Esp&iacute;rito, das coisas do Esp&iacute;rito. Porque o pendor da carne d&aacute; para a morte, mas o do Esp&iacute;rito, para a vida e paz.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Ef&eacute;sios 5.18</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;N&atilde;o vos embriagueis com o vinho, em que h&aacute; devassid&atilde;o, mas enchei-vos com o Esp&iacute;rito Santo.&rdquo;</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; V&Iacute;CIO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Conceito: </strong>Disposi&ccedil;&atilde;o habitual para certo mal; mau costume. (Aur&eacute;lio)</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">O v&iacute;cio nada mais &eacute; do que tenta&ccedil;&otilde;es que geram atos repetitivos, causando depend&ecirc;ncia sejam de que natureza for.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>DE ONDE V&Ecirc;M AS TENTA&Ccedil;&Otilde;ES?</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">I Cor&iacute;ntios 10.13</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;N&atilde;o vos sobreveio tenta&ccedil;&atilde;o que n&atilde;o fosse humana; mas Deus &eacute; fiel e n&atilde;o permitir&aacute; que sejais tentadas al&eacute;m das vossas for&ccedil;as; pelo contr&aacute;rio, juntamente com a tenta&ccedil;&atilde;o, vos prover&aacute; livramento, de sorte que a possais suportar&rdquo;.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Os impulsos da carne t&ecirc;m a tend&ecirc;ncia de consumir o que gera prazer moment&acirc;neo e satisfa&ccedil;&atilde;o dos nossos desejos.</span></span></p>
</div>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>VENCENDO O V&Iacute;CIO</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Nosso dia-a-dia deve ser guiado pelo Esp&iacute;rito Santo de Deus, isto &eacute;, viver segundo uma Palavra que me convence a n&atilde;o usufruir de coisas que podem gerar uma mal para meu corpo, alma e esp&iacute;rito.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Como podemos lutar contra os v&iacute;cios?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Sujeita-vos, pois, a Deus, resisti ao diabo, e ele fugir&aacute; de v&oacute;s&rdquo; (Tiago 4.7). Em Deus est&aacute; a nossa for&ccedil;a! Quando nos submetemos &agrave; sua vontade abrindo o cora&ccedil;&atilde;o para receber o Seu poder, o Esp&iacute;rito Santo obt&eacute;m o controle de nossa vida. Isso n&atilde;o significa que nunca mais seremos tentados, mas que Ele nos dar&aacute; for&ccedil;a e gra&ccedil;a para resistimos as tenta&ccedil;&otilde;es atrav&eacute;s do Seu poder.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">l Cor&iacute;ntios 7.22</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Porque o que &eacute; chamado pelo Senhor, sendo servo, &eacute; liberto do Senhor; e da mesma maneira tamb&eacute;m o que &eacute; chamado sendo livre, servo &eacute; de Cristo.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Alguma vez voc&ecirc; j&aacute; lutou contra h&aacute;bitos que julgou ser imposs&iacute;veis de vencer?</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; algum pecado que voc&ecirc; tenha cometido v&aacute;rias vezes na vida ou que ainda cometa? Voc&ecirc; j&aacute; quis se libertar de algo que o escravizava?</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Existe esperan&ccedil;a?</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Temos que analisar que para termos uma vida protegida das coisas que podem nos fazer mal, temos que ter a atitude de priorizar o que o Senhor nos ensina mediante a sua palavra.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Somente atrav&eacute;s da gra&ccedil;a redentora de Cristo &eacute; que se pode viver sem droga ou qualquer tipo de v&iacute;cio, pois Ele &eacute; a verdade que liberta (Jo&atilde;o 8.32), o caminho a ser seguido para a vida eterna (Jo&atilde;o 14.6).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Colossenses 2.14</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Havendo riscado a c&eacute;dula que era contra n&oacute;s nas suas ordenan&ccedil;as, a qual de alguma maneira nos era contr&aacute;ria, e a tirou do meio de n&oacute;s, cravando-a na cruz&rdquo;.</span></span></p>

      `,
    imagem: require('@/assets/images/reset9.png'),
  },
  {
    titulo: 'Lição 10 - Jugo Desigual',
    videoUrl: 'https://www.youtube.com/embed/sWrRxP7sbJs?si=8nwuY1mRfT26HpM2',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">2 Cor&iacute;ntios 6.14-18</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;N&atilde;o vos prendais a um jugo desigual com os infi&eacute;is; porque, que sociedade tem a justi&ccedil;a com a injusti&ccedil;a? E que comunh&atilde;o tem a luz com as trevas? E que consenso tem o templo de Deus vivente, como Deus disse: Neles habitarei, e entre eles andarei; e eu serei o seu Deus e eles ser&atilde;o o meu povo. Por isso sai do meio deles, e apartai-vos, diz o Senhor; E n&atilde;o toqueis nada imundo, E eu vos receberei; E eu serei para v&oacute;s Pai, E v&oacute;s sereis para mim filhos e filhas, Diz o Senhor Todo-Poderoso.&rdquo;.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O QUE &Eacute; JUGO DESIGUAL?</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Salmos 1.1</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Bem-aventurado o homem que n&atilde;o anda segundo o conselho dos &iacute;mpios, nem se det&eacute;m no caminho dos pecadores, nem se assenta na roda dos escarnecedores.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Mediante a Palavra de Deus, se refere a uma alian&ccedil;a formada entre um crist&atilde;o e um &iacute;mpio. Por&eacute;m isso n&atilde;o significa que devemos abrir m&atilde;o dos nossos amigos &iacute;mpios, mas atrav&eacute;s da ajuda do Esp&iacute;rito Santo, sermos instrumentos da gra&ccedil;a de Deus para Alcan&ccedil;a-los da mesma forma que um dia fomos alcan&ccedil;ados.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONVIVENDO COM JUGO DESIGUAL</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">1 Cor&iacute;ntios 7.14</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Pois o marido incr&eacute;dulo &eacute; santificado pela mulher, e a mulher incr&eacute;dula &eacute; santificada pelo marido crente. Doutra sorte os vossos filhos seriam impuros, mas agora s&atilde;o santificados.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Quando vivemos uma situa&ccedil;&atilde;o a qual o conjugue ou os familiares n&atilde;o servem a Deus, temos a responsabilidade de levar um bom testemunho para que a casa seja santificada, e com jejum e ora&ccedil;&atilde;o esta pessoa ser&aacute; transformada em Cristo.</span></span></p>
</div>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Temos que ficar atentos em rela&ccedil;&atilde;o a este assunto para n&atilde;o servos influenciados e deixarmos o objetivo principal que &eacute; viver uma vida na presen&ccedil;a de Deus fazendo e falando coisas boas.</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Que possamos com toda a for&ccedil;a do nosso ser e com a ajuda do Esp&iacute;rito Santo, ser sal e luz dentro de um mundo t&atilde;o sem sabor e t&atilde;o obscuro. Que n&atilde;o venhamos nos amoldar ao sistema mundano, mas que por onde passarmos possamos transformar pela renova&ccedil;&atilde;o da nossa mente, que agora &eacute; propriedade exclusiva do nosso Senhor e Salvador Jesus Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/reset10.png'),
  },
  {
    titulo: 'Lição 11 - Servo',
    videoUrl: 'https://www.youtube.com/embed/SmMQYAbraRM?si=IdkvVMcVSe_17qsO',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; uma grande diferen&ccedil;a entre ser volunt&aacute;rio, empregado e servo na obra do Senhor. Vamos ver abaixo algumas caracter&iacute;sticas de cada um desses tr&ecirc;s tipos de pessoas.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>VOLUNT&Aacute;RIO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Lev&iacute;tico 10.1-2</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Nadabe e Abi&uacute;, filhos de Ar&atilde;o, tomaram cada um o seu incens&aacute;rio, e puseram neles fogo, e sobre este, incenso, e trouxeram fogo estranho perante a face do Senhor, o que n&atilde;o lhes ordenara.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Caracter&iacute;sticas desse tipo de pessoa:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Escolhe como e quando servir;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz somente o que lhe agrada;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o tem comprometimento;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o depende de Deus, mas da for&ccedil;a pr&oacute;pria;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o aceita cobran&ccedil;a;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Nunca de disp&otilde;e ao sacrif&iacute;cio;</span></span></li>
</ul>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Paul Hoff escreveu: &ldquo;As boas inten&ccedil;&otilde;es n&atilde;o substituem a obedi&ecirc;ncia.&rdquo; Exemplo: Uz&aacute; morre ao tocar a Arca da Alian&ccedil;a (ll Samuel 6.6)</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>EMPREGADO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">2 Reis 5:20</span></span></h3>
</div>

<div>
<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Ent&atilde;o Geazi, servo de Eliseu, homem de Deus, disse: Eis que meu Senhor poupou a este s&iacute;rio Naam&atilde;, n&atilde;o recebendo da sua m&atilde;o alguma coisa do que trazia; por&eacute;m, vive o SENHOR que hei de correr atr&aacute;s dele, e receber dele alguma coisa.&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Caracter&iacute;sticas desse tipo de pessoa:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz as coisas pensando em receber algo em troca;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Encara o trabalho na casa de Deus como um fardo;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Se faz o que lhe &eacute; pedido e faz por obriga&ccedil;&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Se sente explorado se lhe &eacute; pedido algo a mais;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Adora cargos, t&iacute;tulos e posi&ccedil;&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Escolhe a quem servir (pastor ou l&iacute;der possa ver seu trabalho e &ldquo;recompens&aacute;-lo&rdquo;);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Sempre procura uma posi&ccedil;&atilde;o melhor (como um plano de carreira);</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>SERVO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Filipenses 2.7</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Antes a si mesmo se esvaziou, assumindo a forma de servo, tornando-se em semelhan&ccedil;a de homens, e reconhecido em figura humana, a si mesmo se humilhou, tornando-se obediente at&eacute; a morte, e morte de cruz.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Marcos 10.45</span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Porque o Filho do homem tamb&eacute;m n&atilde;o veio para ser servido, mas para servir e dar a sua vida em resgate de muitos&rdquo;</span></span></p>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Caracter&iacute;sticas desse tipo de pessoa:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz o que o Senhor manda;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o tem direito;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Tem um Senhor e dono;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Toma a sua cruz;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o espera pagamento, gratid&atilde;o e mordomia;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Quer ser um mordomo na obra de Cristo;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Faz o que &eacute; necess&aacute;rio para a obra;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Tem alegria em contribuir para o Reino;</span></span></li>
</ul>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONCLUS&Atilde;O</strong></span></span></h2>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Servos s&atilde;o aqueles que realmente frutificam e multiplicam. A igreja s&oacute; pode ser edificada com servos que agem por amor e renunciam o seu &ldquo;eu&rdquo; para que Cristo viva atrav&eacute;s de sua vida. Tomar a cruz de Cristo n&atilde;o &eacute; um fardo e sim obedi&ecirc;ncia a vontade de Deus, mesmo que ela seja contr&aacute;ria ao nosso pr&oacute;prio desejo. O servo se sacrifica pelo reino de Deus por amor a Sua Palavra.</span></span></p>
</div>

      `,
    imagem: require('@/assets/images/reset11.png'),
  },

];

const start: Aula[] = [
  {
    titulo: 'Lição 1 - Conhecendo a bíblia',
    videoUrl: 'https://www.youtube.com/embed/q-w0MYaLKS8?si=NODP5_RzTWoyvNJc',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; j&aacute; tem em suas m&atilde;os a B&iacute;blia Sagrada. S&oacute; nela voc&ecirc; encontra tudo o que Deus fez para dar a salva&ccedil;&atilde;o e a vida eterna &agrave;s pessoas. Por isso, a B&iacute;blia &eacute; tamb&eacute;m conhecida como a Palavra de Deus.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. A B&Iacute;BLIA EM SUAS M&Atilde;OS</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O que significa a palavra &ldquo;B&iacute;blia&rdquo;?</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para voc&ecirc; descobrir a resposta, primeiro, tem de entender que esta palavra quer dizer <strong>&ldquo;livros&rdquo;</strong>, isto &eacute;, v&aacute;rios livros em um s&oacute;. &Eacute; prov&aacute;vel que em sua B&iacute;blia logo nas primeiras folhas, haja um &iacute;ndice, onde est&atilde;o escritos os nomes de todos os livros que comp&otilde;em a B&iacute;blia. Procure-o e d&ecirc; uma lida neles. Voc&ecirc; concluir&aacute; que n&atilde;o se pode ser crente sem a Palavra de Deus em sua totalidade. Por isso, os aut&ecirc;nticos crist&atilde;os devem carregar, ler, estudar e meditar constantemente nessa&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; suprema&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; verdade,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B&iacute;blia&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sagrada.</span></span></p>

<p>&nbsp;</p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A B&iacute;blia, &eacute; a palavra de Deus porque atrav&eacute;s dela o Senhor se d&aacute; a conhecer aos homens e mulheres. Isto se chama <strong>revela&ccedil;&atilde;o divina</strong>. Deus fala conosco atrav&eacute;s da B&iacute;blia. Lendo-a, voc&ecirc; come&ccedil;a a conhecer o Senhor, a entend&ecirc;-lo e a obedecer suas orienta&ccedil;&otilde;es na sua vida particular e na participa&ccedil;&atilde;o da igreja na qual voc&ecirc; faz parte.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A revela&ccedil;&atilde;o de Deus que se encontra na B&iacute;blia foi escrita por cerca de 40 pessoas em dois idiomas, o hebraico e o grego, que s&atilde;o bem diferentes do portugu&ecirc;s. Isto aconteceu h&aacute; muitos anos. Os autores foram profetas, reis, sacerdotes, pescadores, criadores de gado etc. Deus escolheu estas pessoas e as usou apesar das suas imperfei&ccedil;&otilde;es e seus diferentes conhecimentos da vida humana. Este &eacute; o lado maravilhoso da B&iacute;blia. Apesar dos livros serem escritos por pessoas diferentes, em &eacute;pocas bem distantes, e depois reunidos num livro s&oacute;, a B&iacute;blia &eacute; completa e perfeita em unidade e harmonia. Deus inspirou estas pessoas para escreverem, capacitando- as a receber e transmitir o ensino sem mistura ou erro. A inspira&ccedil;&atilde;o divina &eacute; tamb&eacute;m a garantia de que as pessoas escolhidas escreveram apenas o que Deus queria, sem os sinais da fraqueza humana. Leia a seguir o que disse Paulo, um dos escritores: &ldquo;Toda a escritura &eacute; divinamente inspirada...&rdquo; (2 Tim&oacute;teo 3.16&ordf;).</span></span></p>
</div>

<div>
<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. COMO USAR A B&Iacute;BLIA NA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A primeira parte da B&iacute;blia, que come&ccedil;a com o livro de G&ecirc;nesis e termina com o livro de Malaquias, chama-se: <strong>Antigo Testamento </strong>ou, abreviando-se, <strong>AT</strong>. S&atilde;o ao todo 39 livros. Depois de Malaquias, o ultimo livro do Antigo Testamento, inicia-se o <strong>Novo Testamento, </strong>conhecido pelas letras iniciais <strong>NT </strong>e tem 27 livros. Juntos, AT e NT somam 66 livros. Um detalhe interessante &eacute; que os 66 livros n&atilde;o est&atilde;o organizados pela ordem de data em que foram escritos. A preocupa&ccedil;&atilde;o de Deus n&atilde;o foi contar uma hist&oacute;ria cronol&oacute;gica, mas sim, revelar o seu plano para salvar todos os homens e mulheres.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para que se encontre facilmente um texto, cada livro da b&iacute;blia &eacute; dividido em <strong>cap&iacute;tulos </strong>ou <strong>n&uacute;meros </strong>e <strong>vers&iacute;culos </strong>ou <strong>versos</strong>. O n&uacute;mero em tamanho grande ao lado esquerdo das palavras impressas indica o Cap&iacute;tulo ou n&uacute;mero, e o menor, o</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">vers&iacute;culo ou verso. Antes do in&iacute;cio de cada cap&iacute;tulo, ou de alguns grupos de vers&iacute;culos, voc&ecirc; encontra o t&iacute;tulo do assunto. &Eacute; bom voc&ecirc; saber que os escritores da B&iacute;blia n&atilde;o escreveram os t&iacute;tulos, cap&iacute;tulos, vers&iacute;culos, etc. Todos estes recursos foram adotados muitos anos depois para facilitar a leitura e o estudo da b&iacute;blia.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Existem diversas vers&otilde;es de tradu&ccedil;&atilde;o da B&iacute;blia. As vers&otilde;es s&atilde;o resultantes de atualiza&ccedil;&otilde;es de uma tradu&ccedil;&atilde;o. A tradu&ccedil;&atilde;o significa que tudo o que estava</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">escrito em hebraico (AT) e grego (NT) foi traduzido para o portugu&ecirc;s. A tradu&ccedil;&atilde;o principal utilizada no Brasil &eacute; a de Jo&atilde;o Ferreira de Almeida. Desta tradu&ccedil;&atilde;o, existem as vers&otilde;es que apresentam diferen&ccedil;as, n&atilde;o nas mensagens, mas nas palavras.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Veja um exemplo: numa vers&atilde;o, voc&ecirc; l&ecirc; em 1 Cor&iacute;ntios 13: &ldquo;Caridade&rdquo; e em outra, publicada mais recentemente, &ldquo;amor&rdquo;. A quest&atilde;o &eacute; que com o passar do tempo a palavra &ldquo;caridade&rdquo; tomou outro sentido e n&atilde;o &eacute; t&atilde;o forte como o termo &ldquo;amor&rdquo;. Por causa das diferentes vers&otilde;es, voc&ecirc; escuta as pessoas lerem o mesmo vers&iacute;culo de maneiras diferentes.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. COMO USAR A B&Iacute;BLIA NO DIA-A-DIA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; n&atilde;o deve usar a B&iacute;blia apenas em alguns momentos, pois se limitar o uso dela o seu crescimento espiritual acontecer&aacute; lentamente. Um passo que voc&ecirc; deve dar para crescer espiritualmente &eacute; estudar profundamente a Palavra de Deus. Devem acompanhar voc&ecirc; num estudo mais aprofundado da B&iacute;blia os seguintes materiais:</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>a) A B&iacute;blia</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Se poss&iacute;vel, use v&aacute;rias vers&otilde;es existentes em portugu&ecirc;s para consulta comparativa;</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>b) Uma concord&acirc;ncia B&iacute;blica</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Ajuda a localizar palavras, assuntos e suas refer&ecirc;ncias b&iacute;blicas, livro por livro;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>c) Chaves B&iacute;blicas</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Traz esbo&ccedil;os dos livros da B&iacute;blia e tamb&eacute;m introdu&ccedil;&atilde;o dos autores, hist&oacute;ria e datas;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>d) Dicion&aacute;rio B&iacute;blico</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para a explica&ccedil;&atilde;o de palavras e assuntos b&iacute;blicos;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>e) Dicion&aacute;rio de Portugu&ecirc;s</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para saber o significado das palavras pouco conhecidas por voc&ecirc;;</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>f) Um caderno</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px">Para anota&ccedil;&otilde;es das observa&ccedil;&otilde;es e correla&ccedil;&otilde;es do seu estudo.</span></span></p>

<p>&nbsp;</p>

      `,
    imagem: require('@/assets/images/start1.png'),
  },
  {
    titulo: 'Lição 2 - Conhecendo a Deus',
    videoUrl: 'https://www.youtube.com/embed/w4KbJsqNDC4?si=XN_Zz_gUgpULRD00',
    descricao:
      `
      <div>
<div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus tem m&uacute;ltiplos nomes que legitimam sua grandeza e excel&ecirc;ncia dando respaldo ao ser humano sobre sua exist&ecirc;ncia e convic&ccedil;&atilde;o. Seguem algumas informa&ccedil;&otilde;es que podem te ajudar a conhecer um pouco do muito que &eacute; o nosso Deus.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. CONHECENDO DEUS ATRAV&Eacute;S DE SUAS QUALIDADES</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus tem muitas qualidades atrav&eacute;s das quais Ele se identifica com o ser humano e, ao mesmo tempo, torna-se diferente de todos os outros seres espirituais. Uma das formas de voc&ecirc; descobrir algumas dessas qualidades &eacute; conhecendo alguns dos seus variados nomes. O nome de Deus &eacute; muito mais do que um conjunto de letras do portugu&ecirc;s ou de qualquer outro idioma. Na b&iacute;blia, os nomes de Deus mais comuns s&atilde;o: Senhor, Jeov&aacute;, Pai, terno, Alt&iacute;ssimo etc. Independente da nomenclatura escolhida, seguem algumas refer&ecirc;ncias importantes de como devemos tratar o Seu nome:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser invocado na adora&ccedil;&atilde;o (leia G&ecirc;nesis 12.8);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser temido (leia Deuteron&ocirc;mio 28.58);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser louvado (leia 2 Samuel 22.50);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome n&atilde;o pode ser tomado em v&atilde;o (leia &Ecirc;xodo 20.7);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome n&atilde;o pode ser profanado, nem blasfemado (leia Lev&iacute;tico 18.21;24.16);</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">O seu nome deve ser santificado e bendito (leia Mateus 6.9</span></span></li>
</ol>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. CONHECENDO DEUS ATRAV&Eacute;S DOS ASPECTOS DO SEU CAR&Aacute;TER</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguem algumas caracter&iacute;sticas EXCLUSIVAS de Deus:</span></span></p>
</div>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Soberania</strong>: Para voc&ecirc;, pode ser encorajador porque te fornece a seguran&ccedil;a de que nada est&aacute; fora do controle do Senhor e os Seus planos s&atilde;o, de fato, realizados. Leia Sl 29.10,71.16.f</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Eternidade</strong>: Nunca houve um tempo em que Deus n&atilde;o existisse. Ele n&atilde;o teve princ&iacute;pio e jamais ter&aacute; fim. N&atilde;o se limita ao tempo. Sendo eterno, Ele v&ecirc; o passado e o futuro de modo t&atilde;o claro como contempla o presente. Nesta perspectiva, Ele sabe o que &eacute; melhor para a vida do crist&atilde;o. Leia Isa&iacute;as 44.6</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onisci&ecirc;ncia</strong>: Deus possui todo o conhecimento que existe. Nada o pega de surpresa. A onisci&ecirc;ncia do Senhor permite que Ele tenha conhecimento de tudo antes e depois. Leia Hebreus 4.13.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipresen&ccedil;a</strong>: Significa que Deus est&aacute; presente em todo o tempo e espa&ccedil;o. Ningu&eacute;m pode se esconder de sua face. Mas a presen&ccedil;a do Senhor deve ser experimentada em todo o tempo de maneira bem real. Leia Jeremias 23.24.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipotente</strong>: Deus tem mais do que o poder necess&aacute;rio para realizar todas as coisas. O crente tem certeza de sua salva&ccedil;&atilde;o porque o Senhor &eacute; Todo-Poderoso. Esta for&ccedil;a se manifesta no Evangelho de Cristo para salva&ccedil;&atilde;o dos homens. Leia Romanos 1.16.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Imut&aacute;vel</strong>: Jamais muda em Sua natureza e postura. Ser&aacute; sempre bom, justo e verdadeiro. Leia N&uacute;meros 23.19.</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Existem tamb&eacute;m os aspectos <strong>partilhados </strong>de Deus para com o ser humano. S&atilde;o caracter&iacute;sticas que Deus espera que n&oacute;s, Seus filhos, tamb&eacute;m possamos ter. Estes aspectos se manifestam de forma limitada.</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Retid&atilde;o: </strong>&Eacute; imposs&iacute;vel Deus fazer algo errado. Por causa de sua retid&atilde;o, Ele espera o mesmo de todos os que desejam estar em Sua presen&ccedil;a. &Eacute; um estilo de vida para ser vivido pela gra&ccedil;a de Deus, pois &eacute; humanamente imposs&iacute;vel ao homem e &agrave; mulher terem a retid&atilde;o total de Deus. Leia Mateus 5-48.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Justi&ccedil;a: </strong>Deus jamais age com desonestidade. A justi&ccedil;a divina &eacute; manifestada no livramento do inocente. Leia 2 Tim&oacute;teo 4-8.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Amor: </strong>&Eacute; um outro aspecto divino. Na verdade, Deus &eacute; amor. Esta virtude do Senhor &eacute; perfeita e infinita. A maior demonstra&ccedil;&atilde;o do amor de Deus foi a de conceder o seu pr&oacute;prio filho para morrer em nosso lugar atrav&eacute;s do Seu sacrif&iacute;cio na cruz do Calv&aacute;rio. Leia Jo&atilde;o 3.16.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Verdade: </strong>Deus &eacute; a verdade absoluta. O homem e a mulher desejam ardentemente encontr&aacute;-la. Por&eacute;m, muitos a procuram em outras fontes. Como voc&ecirc; &eacute; de Jesus, sua busca terminou, pois Cristo &eacute; a verdade. Por esse motivo, viver distante da mentira deve ser um dos grandes objetivos em nossa vida crist&atilde;. Leia Jo&atilde;o 8.32.</span></span></li>
</ol>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. CONHECENDO DEUS, JESUS E O ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Pai, Jesus Cristo e o Esp&iacute;rito Santo existem em unidade s&atilde;o tr&ecirc;s pessoas reais e distintas. Elas trabalham juntas em favor do ser humano. Em Jo&atilde;o 15.26 existe uma afirma&ccedil;&atilde;o de Jesus: &ldquo;Mas quando vier o Consolador, que eu da parte do Pai vos hei de enviar, aquele Esp&iacute;rito de verdade, que procede do Pai, ele testificar&aacute; de mim&rdquo;. Isso significa que h&aacute; unidade entre o Pai, Jesus Cristo e o Esp&iacute;rito Santo de tal forma que os tr&ecirc;s s&atilde;o um, ou seja, um s&oacute; Deus. Leia 2 Cor&iacute;ntios 13.14.</span></span></p>
</div>

      `,
    imagem: require('@/assets/images/start2.png'),
  },
  {
    titulo: 'Lição 3 - A Salvação',
    videoUrl: 'https://www.youtube.com/embed/nctL4jP0bHY?si=E3G6gwLGiiv9-SLq',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o &eacute; a maior ben&ccedil;&atilde;o que o ser humano pode receber, e ao mesmo tempo &eacute; a maior responsabilidade. A salva&ccedil;&atilde;o &eacute; o tema central da B&iacute;blia. Todo crist&atilde;o deve conhece-la bem e falar dela aos que ainda n&atilde;o aceitaram a Cristo para que tamb&eacute;m sejam salvos.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. O QUE &Eacute; A SALVA&Ccedil;&Atilde;O?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A princ&iacute;pio, pode-se afirmar que ela &eacute; o resultado da morte de Jesus Cristo na cruz do Calv&aacute;rio, que livra a humanidade da condena&ccedil;&atilde;o eterna causada pelo pecado. Leia Ef&eacute;sios 1.7; 2,1. Podemos dividir o conceito da palavra salva&ccedil;&atilde;o em dois atos:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Um ato da soberana vontade de Deus</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o &eacute; um ato da soberana vontade de Deus, sob a qual seu filho nos reconciliou consigo mesmo. Est&aacute; relatado em 2 Cor&iacute;ntios 5-18.19: &ldquo; E tudo isto prov&eacute;m de Deus, que nos reconciliou consigo mesmo por Jesus Cristo, e nos deu o minist&eacute;rio da reconcilia&ccedil;&atilde;o: isto &eacute;, Deus estava em Cristo reconciliando consigo o mundo, n&atilde;o lhes imputando os seus pecados...&rdquo;. Observe que a salva&ccedil;&atilde;o &eacute; a demonstra&ccedil;&atilde;o do grande amor de Deus em favor da humanidade, condenada pelo pecado. Leia Romanos 5.8. Ela &eacute; oferecida a todos, sem exce&ccedil;&atilde;o. Em Cristo, todos podem ser salvos, libertos do pecado, tornando-se, assim, filhos de Deus. Leia Jo&atilde;o 1.12.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Um ato da infinita miseric&oacute;rdia de Deus</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o vem graciosamente mediante a f&eacute; e n&atilde;o atrav&eacute;s dos nossos pr&oacute;prios m&eacute;ritos ou boas obras. O pr&oacute;prio criador tomou a decis&atilde;o de reconciliar consigo o homem e a mulher, que pela desobedi&ecirc;ncia, haviam se afastado dEle, tornando-se escravos do pecado e inimigos de quem os criara. Voc&ecirc; tamb&eacute;m precisa saber que a sua salva&ccedil;&atilde;o custou um alto pre&ccedil;o, o sangue de Jesus Cristo, o Cordeiro de Deus (Jo&atilde;o 1.29), imolado pelos nossos pecados na cruz do Calv&aacute;rio conforme a profecia de Isa&iacute;as 53.4-7. Leia tamb&eacute;m Ef&eacute;sios 2.8,9.</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. A NECESSIDADE DA SALVA&Ccedil;&Atilde;O</strong></span></span></h3>
</div>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Todos precisa arrepender-se dos seus pecados, confess&aacute;-los a Deus e abandon&aacute;-los definitivamente aceitando o dom gratuito de Deus. Leia Romanos 6.23.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1. A origem do pecado</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Como o pecado entrou no mundo, como isto aconteceu?</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em Genesis 1.26,27 lemos que Deus criou o homem e a mulher &agrave; sua imagem e semelhan&ccedil;a e o colocou no Jardim do &Eacute;den. Disse-lhes que de todos os frutos podiam comer, por&eacute;m, daquele da &aacute;rvore do conhecimento do bem e do mal, o Senhor lhes proibiu que provassem. Feitos &agrave; imagem e semelhan&ccedil;a de Deus, o homem e a mulher possu&iacute;am o livre-arb&iacute;trio. Estavam capacitados a discernirem o bem e o mal, o certo e o errado. Enquanto obedecessem viveriam. Todavia, apesar de usufruir das del&iacute;cias do &Eacute;den e conviverem em perfeita harmonia com o Criador, o homem e a mulher, tentados, pecaram e foram destitu&iacute;dos da gl&oacute;ria com que foram criados perdendo, assim, a comunh&atilde;o com Deus. Como representantes da ra&ccedil;a humana, eles transmitiram o pecado e a condena&ccedil;&atilde;o &agrave; sua descend&ecirc;ncia. A desobedi&ecirc;ncia de Ad&atilde;o afetou toda cria&ccedil;&atilde;o, a qual geme e chora sob o peso da maldi&ccedil;&atilde;o. Leia Genesis 3.6,17-19 e Romanos 8.22.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2. A heran&ccedil;a do pecado</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A salva&ccedil;&atilde;o &eacute; a vida eterna em Cristo Jesus, visto que s&oacute; Ele pode salvar o homem da condena&ccedil;&atilde;o da morte eterna, causada pelo pecado do primeiro homem. Veja o que relata a B&iacute;blia: &ldquo;Porque todos pecaram e destitu&iacute;dos est&atilde;o da gl&oacute;ria de Deus&rdquo; (Romanos 3.23). &ldquo;Pelo que, como por um homem entrou o pecado no mundo, e pelo pecado a morte, assim tamb&eacute;m a morte passou a todos os homens; por isso, que todos pecaram&rdquo; (Romanos 5.12). Esta &eacute; uma revela&ccedil;&atilde;o terr&iacute;vel: &ldquo;a morte passou a todos os homens...&rdquo;. Deste modo, o pecado foi a heran&ccedil;a maldita deixada a humanidade.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Como escapar desta condena&ccedil;&atilde;o?</span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Veja a import&acirc;ncia da salva&ccedil;&atilde;o: voc&ecirc; estava morto em delitos e pecados e nada podia fazer para escapar do ju&iacute;zo divino. Por&eacute;m, Deus, em Seu filho, o libertou da condena&ccedil;&atilde;o da morte eterna. Leia Jo&atilde;o 5.24. Voc&ecirc;, agora, n&atilde;o precisa temer o ju&iacute;zo final, pois Jesus, mediante a Sua morte na cruz do calv&aacute;rio, condenou o pecado e concedeu a vida eterna a todos que nEle crerem. Cristo anulou por Sua morte e ressurrei&ccedil;&atilde;o os efeitos do pecado, que s&atilde;o a morte eterna e suas consequ&ecirc;ncias.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Leia&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Romanos&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8.1.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. ASPECTOS DA SALVA&Ccedil;&Atilde;O</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">S&atilde;o dois:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1. Justifica&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Como se justificaria o homem para com Deus?</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A humanidade, morta em seus delitos e pecados, n&atilde;o tinha como justificar-se perante o Todo- Poderoso. Por&eacute;m, mediante Sua morte expiat&oacute;ria e substitutiva, Jesus tornou poss&iacute;vel a justifica&ccedil;&atilde;o do transgressor.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Como &eacute; poss&iacute;vel isto?</span></span></h3>
</div>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Justifica&ccedil;&atilde;o &eacute; um termo judicial que lembra um tribunal, em que Deus (o supremo juiz) absolve o pecador das suas transgress&otilde;es e o declara justo, isto &eacute;, justificado. Desta forma, Deus (o ofendido) reconcilia consigo mesmo a humanidade (o ofensor). O que a humanidade n&atilde;o p&ocirc;de fazer Deus o fez por ela. A justi&ccedil;a de Cristo (o justo) &eacute; concedida ao ser humano mediante a gra&ccedil;a divina. Agora, feito justo pela de justi&ccedil;a de Cristo que lhe foi concedida, ele se torna membro da fam&iacute;lia divina e adotado como filho de Deus mediante o batismo nas &aacute;guas. Leia Romanos 5.17-19.</span></span></p>

<p style="margin-left:14.25pt">&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2. A santifica&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Uma vez restaurada a comunh&atilde;o com Deus, a humanidade abandona as pr&aacute;ticas pecaminosas do passado e separa-se (santifica-se) para servi&ccedil;o do Senhor. A santifica&ccedil;&atilde;o &eacute; um ato do Esp&iacute;rito Santo no interior do crist&atilde;o, que se reflete nos seus atos exteriores. Portanto, justifica&ccedil;&atilde;o e santifica&ccedil;&atilde;o s&atilde;o os dois aspectos da salva&ccedil;&atilde;o plena em Cristo Jesus. Ao subir ao c&eacute;u, o Senhor Jesus ordenou aos Seus disc&iacute;pulos que realizassem a obra que ele iniciara em seu minist&eacute;rio terreno. Desde ent&atilde;o, todos os que realmente aceitam a Cristo como o seu Senhor e Salvador cumprem o &ldquo;Ide&rdquo;, a fim de ganharem vidas para o Reino de Deus.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. JORNADA DA VIDA CRIST&Atilde;</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>A. Confiss&atilde;o de f&eacute; em Jesus Cristo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">1 Joa&otilde; 4.15: &ldquo;Qualquer que confessar que Jesus &eacute; o Filho de Deus, Deus est&aacute; nele, e ele em Deus.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>B. Justifica&ccedil;&atilde;o pela f&eacute; em Jesus Cristo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Romanos 5.1: &ldquo;Tendo sido, pois, justificados pela f&eacute;, temos paz com Deus, por nosso Senhor Jesus.&rdquo;</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>C. Batismo nas &aacute;guas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atos 8.9: &ldquo; E Felipe mandou parar o carro, e descerem ambos &agrave; &aacute;gua, tanto Felipe como o eunuco, e o batizou.&rdquo; (At. 8.38).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>D. Santifica&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Romanos 6.19(b): &ldquo;Assim apresentai agora os vossos membros &agrave; justi&ccedil;a para a santifica&ccedil;&atilde;o.&rdquo;</span></span></p>

      `,
    imagem: require('@/assets/images/start3.png'),
  },
    {
    titulo: 'Lição 4 - Conhecendo a Igreja',
    videoUrl: 'https://www.youtube.com/embed/5WUd_c4cQxA?si=iHzaeD69ctGbyu0e',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; faz parte da Igreja, pois n&atilde;o apenas recebeu a salva&ccedil;&atilde;o oferecida por Cristo, mas tamb&eacute;m foi inclu&iacute;do em Sua fam&iacute;lia. A palavra &ldquo;Igreja&rdquo;, nesta li&ccedil;&atilde;o n&atilde;o est&aacute; restrita a CRIEP (Igreja Evang&eacute;lica Pentecostal Comunh&atilde;o Rara da F&eacute;) ou a qualquer outra denomina&ccedil;&atilde;o, nem ao local onde voc&ecirc; frequenta os cultos. Depois do plano idealizado por Deus para salvar a humanidade, a igreja &eacute; uma das mais lindas cria&ccedil;&otilde;es da divindade. Aqueles que s&atilde;o salvos formam um corpo, que &eacute; a porta-voz da salva&ccedil;&atilde;o para outras pessoas. A igreja &eacute; um organismo que tem a pr&oacute;pria vida em Cristo, o qual estabeleceu sua miss&atilde;o. Quem faz parte desta igreja d&aacute; continuidade ao trabalho de Cristo na terra, isto &eacute; ser uma ben&ccedil;&atilde;o para o mundo. Ningu&eacute;m recebeu a salva&ccedil;&atilde;o simplesmente para ser salvo, mas sim para integrar-se &agrave; igreja. Por isso, &eacute; preciso que voc&ecirc; compreenda bem o que ela significa, conhe&ccedil;a quais s&atilde;o os seus objetivos e a suas ordenan&ccedil;as.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. OQUE &Eacute; A IGREJA?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A palavra &ldquo;Igreja&rdquo; significa &ldquo;uma reuni&atilde;o de pessoas chamadas para fora&rdquo; ou seja, um grupo de pessoas que sa&iacute;ram do mundo (espiritualmente falando) para seguirem a Cristo. Todos os crist&atilde;os espalhados pelo mundo formam a igreja. Ela n&atilde;o est&aacute; restrita &agrave; uma &aacute;rea geogr&aacute;fica e nem a um &uacute;nico povo da terra, antes &eacute; invis&iacute;vel e universal.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Existem dois s&iacute;mbolos que representam a Igreja:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Corpo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Jesus n&atilde;o est&aacute; mais presente de forma f&iacute;sica, mas em cada pessoa que o recebe, em qualquer parte do mundo, ele introduz a Sua vida para conect&aacute;-la ao corpo. Por ter a vida em Cristo, a Igreja n&atilde;o &eacute; um simples ajuntamento de pessoas, uma associa&ccedil;&atilde;o ou clube. &Eacute; um organismo, algo que t&ecirc;m exist&ecirc;ncia tal como o corpo humano. &Eacute; um composto de muitos membros e &oacute;rg&atilde;os que funcionam em prol de uma vida comum. Da mesma forma que o ser humano &eacute; um, mas tem milh&otilde;es de c&eacute;lulas vivas, assim tamb&eacute;m &eacute; a igreja. Um corpo, mas constitu&iacute;dos por milh&otilde;es de pessoas nascidas de novo por interm&eacute;dio do Evangelho de Jesus. Possui tamb&eacute;m um cabe&ccedil;a, o pr&oacute;prio Cristo. Ele &eacute; o l&iacute;der, o guia, o principal da Igreja. Leia Ef&eacute;sios 2.19-22 e Colossenses 1.18.</span></span></p>
</div>

<div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Casa de Ora&ccedil;&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Embora Deus habite em toda parte, &eacute; saud&aacute;vel nos reunirmos como Igreja local para juntos adorarmos e louvarmos ao Senhor. Leia Hebreus 10.24-25.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Infelizmente, por conta de uma s&eacute;rie de acontecimentos tristes dentro de algumas igrejas, muitos est&atilde;o adotando uma ideologia chamada de: &ldquo;Crist&atilde;os sem igreja&rdquo;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por mais que respeitamos as pessoas que pensam assim, de forma algumas, essa ideologia far&aacute; parte do nosso DNA. Sabemos sim, das tristezas geradas por l&iacute;deres irrespons&aacute;veis, mas tamb&eacute;m sabemos do qu&atilde;o &eacute; apaixonante servirmos numa igreja Local.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Uma vez Bill Hybels escreveu: <em>&ldquo;A Igreja Local &eacute; a esperan&ccedil;a do mundo quando funciona corretamente.&rdquo;</em></span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. OS OBJETIVOS DA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s da B&iacute;blia, voc&ecirc; descobre que a Igreja foi fundada por Cristo para cumprir as seguintes finalidades:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Evangelizar o mundo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A principal atividade dos crist&atilde;os &eacute; levar a salva&ccedil;&atilde;o para os n&atilde;o crist&atilde;os. Cristo, depois de completar a Sua miss&atilde;o na Terra, declarou: &ldquo;&Eacute; me dado todo o poder no C&eacute;u e na Terra. &ldquo;E, em seguida, estabeleceu uma miss&atilde;o aos Seus seguidores.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Leia Mateus 28.19 e 20. &Eacute; atrav&eacute;s da Igreja que o Evangelho &eacute; pregado a todas as pessoas do mundo. Esta miss&atilde;o n&atilde;o foi dada aos anjos e nem a outro ser espiritual, mas aos crist&atilde;os que formam a Igreja.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Lugar para o crist&atilde;o cultuar a Deus e aprender da Sua Palavra</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O culto &eacute; o momento de ora&ccedil;&atilde;o, louvor, adora&ccedil;&atilde;o e edifica&ccedil;&atilde;o dos crist&atilde;os. No culto, todos os crist&atilde;os podem se unir em ora&ccedil;&atilde;o, peti&ccedil;&atilde;o, a&ccedil;&atilde;o de gra&ccedil;as e intercess&atilde;o. O culto tamb&eacute;m &eacute; uma oportunidade para os crist&atilde;os estudarem a Biblia. A pessoa aumenta o seu crescimento espiritual quando a palavra &eacute; compreendida com sabedoria em um culto ou estudo b&iacute;blico. Quando os crist&atilde;os se re&uacute;nem para cultuar a Deus, existe a oportunidade para que venham praticar a comunh&atilde;o muito mais do que uma simples amizade. A comunh&atilde;o &eacute; resultante de uma experi&ecirc;ncia comum. Todas as diferen&ccedil;as s&atilde;o eliminadas, e os homens e as mulheres se tornam irm&atilde;os em Cristo. Na igreja, voc&ecirc; &eacute; aperfei&ccedil;oado para o desempenho do servi&ccedil;o e edifica&ccedil;&atilde;o/constru&ccedil;&atilde;o do corpo de Cristo. Leia Hebreus 10.25, 1Jo&atilde;o 1.6-7 e Colossenses 3.16.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Lugar para o crente praticar a mordomia (servi&ccedil;o) crist&atilde;</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Tudo o que voc&ecirc; possui n&atilde;o lhe pertence (Leia salmos 24.1). Por isso, n&atilde;o tem o direito de fazer o que quer. Deus est&aacute; em primeiro lugar em sua exist&ecirc;ncia. Isso inclui sua vida, seu tempo, seus talentos e suas finan&ccedil;as. Voc&ecirc; deve buscar o Reino de Deus e a Sua justi&ccedil;a e ter a certeza que as demais coisas ser&atilde;o acrescentadas. Leia Mateus 6.33.</span></span></p>
</div>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Exemplo:</span></span></p>

<ul>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Passar boa parte do seu tempo cultuando a Deus e o servindo na evangeliza&ccedil;&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Empregar todos os seus talentos na igreja, para torn&aacute;-lo forte e vibrante;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Investir financeiramente atrav&eacute;s dos d&iacute;zimos e ofertas;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Dedicar os seus bens ao Senhor, pois voc&ecirc; prestar&aacute; conta a Ele de tudo o que administrou nessa vida.</span></span></li>
</ul>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS DUAS ORDENAN&Ccedil;AS DA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas cerim&ocirc;nias ordenadas por Cristo para que os Crist&atilde;os as pratiquem: o batismo em &aacute;gua e a Ceia do Senhor (Eucaristia).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.O Batismo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Atrav&eacute;s do batismo, a pessoa d&aacute; um testemunho p&uacute;blico de sua identifica&ccedil;&atilde;o com Cristo, &Eacute; o sinal exterior que representa a morte para o mundo e a ressurrei&ccedil;&atilde;o para Deus.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cada um de n&oacute;s repete, de modo espiritual, o que aconteceu com Cristo. Ele morreu e ressuscitou. Assim, pelo batismo voc&ecirc; prova que &eacute; vitorioso. O batismo em &aacute;guas n&atilde;o salva, porque em si, n&atilde;o tem poder para tal. As igrejas locais estabelecem esta pratica para que o novo crente se torne membro dela. A maioria das denomina&ccedil;&otilde;es evang&eacute;licas n&atilde;o batiza crian&ccedil;as, porque entendem que essa decis&atilde;o precisa ser muito bem avaliada pela pr&oacute;pria pessoa. Mateus</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">3.11 e 28.19, Marcos 1.9, Jo&atilde;o 1.32-33 e Atos 2.38.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A CRIEP, como a maioria das denomina&ccedil;&otilde;es evang&eacute;licas, n&atilde;o batizam crian&ccedil;as com menos de 12 anos de idade, pois entendemos que essa decis&atilde;o precisa ser muito bem avaliada.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Ceia do Senhor (Eucaristia)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Na CRIEP, todo m&ecirc;s h&aacute; pelo menos um culto de ceia. Esse culto n&atilde;o foi ideia de um homem ou mulher, mas foi institu&iacute;do por Jesus na v&eacute;spera da Sua crucifica&ccedil;&atilde;o, para os crist&atilde;os relembrarem da Sua morte atrav&eacute;s do p&atilde;o e do vinho. O primeiro simboliza o seu Corpo, e o segundo, o Seu sangue. N&atilde;o somente para relembra a Sua morte vitoriosa, mas os crist&atilde;os tomam a Ceia do Senhor para anunciar a Cristo, at&eacute; que Ele volte. Para participar da Ceia, cada um deve examinar-se a si mesmo e remover qualquer impedimento. N&atilde;o apenas com apar&ecirc;ncia de santidade, mas como um pecador arrependido e um instrumento para ser usado no testemunho de Cristo aos homens e mulheres perdidos. Leia Mateus 26.26-29, 1 Cor&iacute;ntios 10.16 e 11.26-31.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS DUAS ORDENAN&Ccedil;AS DA IGREJA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">H&aacute; duas cerim&ocirc;nias ordenadas por Cristo para que os Crist&atilde;os as pratiquem: o batismo em &aacute;gua e a Ceia do Senhor (Eucaristia).</span></span></p>

      `,
    imagem: require('@/assets/images/start4.png'),
  },
  {
    titulo: 'Lição 5 - Princípios da Oração',
    videoUrl: 'https://www.youtube.com/embed/8XFZ2DwA3V0?si=pSTtmmRS3hR2LRcm',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nesta li&ccedil;&atilde;o, voc&ecirc; vai conhecer o quanto &eacute; bom orar, e vai aprender que tudo quanto se pede ao Senhor, com f&eacute;, mediante Sua vontade, se recebe.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. O QUE SIGNIFICA ORAR?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Conversar com Deus: </strong>&Eacute; o di&aacute;logo que devemos manter com o Pai celestial.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Eacute; ter comunh&atilde;o com Deus: </strong>Ela faz com que as pessoas sintam a comunh&atilde;o real com seu criador. Seria imposs&iacute;vel para os crist&atilde;os, no decorrer da historia da Igreja enfrentar os tribunais, as arenas, as fogueiras, os pelot&otilde;es de fuzilamento, as pris&otilde;es, a fome e a sede, a persegui&ccedil;&atilde;o, a incompreens&atilde;o, e tantos outros males, n&atilde;o fosse com a certeza de que n&atilde;o estavam sozinhos, mas sentiam uma &ldquo;m&atilde;o&rdquo; que lhes segurava e uma &ldquo;voz&rdquo; suave a lhes dizer: &ldquo;Coragem, meus amigos, pois estou aqui para lhes conceder a vit&oacute;ria e, logo mais, voc&ecirc;s estar&atilde;o comigo!&rdquo;</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Orar n&atilde;o &eacute; rezar: </strong>Como j&aacute; foi dito anteriormente, orar &eacute; conversar com Deus, &eacute; dialogar com Ele. Deve fluir normal e espontaneamente. O Esp&iacute;rito Santo nos inspira as palavras que devem ser ditas nas ora&ccedil;&otilde;es que fazemos. N&atilde;o &eacute; errado reproduzirmos ora&ccedil;&otilde;es feitas por outras pessoas, mas na maioria das vezes &eacute; importante usarmos as nossas pr&oacute;prias palavras, fugindo, assim, das v&atilde;s repeti&ccedil;&otilde;es.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os disc&iacute;pulos pediram a Jesus que lhe ensinasse a orar. O Mestre, de pronto, lhe respondeu:</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Pai nosso que est&aacute;s nos c&eacute;us! Santificado seja o teu nome. Venha o teu Reino; seja feita a tua vontade, assim na terra como no c&eacute;u. D&aacute;-nos hoje o nosso p&atilde;o de cada dia. Perdoa as nossas d&iacute;vidas, assim como perdoamos aos nossos devedores. E n&atilde;o nos deixe cair em tenta&ccedil;&atilde;o, mas livra-nos do mal, porque teu &eacute; o Reino, o poder e a gl&oacute;ria para sempre. Am&eacute;m&rdquo;. Mateus 6.9-13 (NVI).</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esta &eacute; uma ora&ccedil;&atilde;o ensinada por Jesus e utilizada pela maioria das igrejas evang&eacute;licas nos dias atuais.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. COMO ORAR?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>De joelhos: </strong>Muitos consideram esta a melhor maneira de se conversar com Deus, pois &eacute; uma demonstra&ccedil;&atilde;o de submiss&atilde;o, rever&ecirc;ncia e humildade. Leia Ef&eacute;sios 3.14.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>De p&eacute;: </strong>Este modo refere-se a Josaf&aacute;, rei de Jud&aacute;, que em p&eacute;, diante do povo, orou a Deus, e recebeu a resposta imediatamente. Os crist&atilde;os costumam orar em p&eacute;, no in&iacute;cio, durante e no fim dos cultos. Leia 2 Cr&ocirc;nicas 20.5-6.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Deitado: </strong>Esta passagem registra a enfermidade de Ezequias, rei de Jud&aacute;. Acamado, recebeu a visita do profeta Isa&iacute;as que lhe transmitiu o recado de Deus a respeito de sua morte iminente: &ldquo;Morrer&aacute;s, e n&atilde;o viver&aacute;s&rdquo;. Deitado, Ezequias virou o rosto para a parede e orou. O Senhor o ouviu e concedeu mais 15 anos de vida. Leia 2 Reus 20.2-3.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. ONDE ORAR?</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Na Casa de Ora&ccedil;&atilde;o: </strong>Biblicamente, todas as igrejas evang&eacute;licas dedicadas a Deus, tornam-se uma Casa de Ora&ccedil;&atilde;o. Nela, os Crist&atilde;os se re&uacute;nem para buscar a presen&ccedil;a de Deus e receber Suas b&ecirc;n&ccedil;&atilde;os. Consagra&ccedil;&otilde;es, Reuni&otilde;es de Ora&ccedil;&atilde;o e Vig&iacute;lias s&atilde;o encontros j&aacute; tradicionais em nossas igrejas. Ocasi&otilde;es em que adoramos a Deus, Ele nos enche com o Esp&iacute;rito Santo, cura nossas enfermidades e nos ajuda em orienta&ccedil;&atilde;o para resolvermos os nossos problemas. Leia Mateus 21.13.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Em particular: </strong>Jesus, em seu Serm&atilde;o da montanha, enfatizou que a ora&ccedil;&atilde;o feita em particular &eacute; ouvida pelo Senhor, que v&ecirc; secretamente. Leia Mateus 6.6.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Em fam&iacute;lia: </strong>Aqueles primeiros crist&atilde;os ainda n&atilde;o tinham um templo-sede para se reunirem, utilizavam as casas dos irm&atilde;os em Cristo para cultuar ao Senhor. Oravam exatamente na resid&ecirc;ncia de Maria, m&atilde;e do evangelista Marcos (escritor do segundo evangelho), quando um anjo de Deus, em resposta &agrave;s suas ora&ccedil;&otilde;es, visitou o c&aacute;rcere onde estava preso o ap&oacute;stolo Pedro, e o libertou. Leia Atos 12.12.</span></span></p>

<p>&nbsp;</p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. QUANDO ORAR?</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ao deitar-se: </strong>Depois de um dia estafante, principalmente em uma cidade grande, onde se enfrenta perigos mil, &eacute; <strong>dever </strong>do crente orar ao deitar e agradecer a Deus pelos grandes livramentos, pela prote&ccedil;&atilde;o a Deus pelos grandes livramentos, pela prote&ccedil;&atilde;o dos assaltos, das batidas do carro no tr&acirc;nsito, dos atropelamentos; pela sa&uacute;de e por tudo que lhe acontece, pois a B&iacute;blia recomenda: &ldquo;Dando sempre gra&ccedil;as por tudo a nosso Deus e Pai em nome do nosso Senhor Jesus Cristo&rdquo; &ndash; Ef&eacute;sios 5.20.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ao levantar-se: </strong>Nossas vidas est&atilde;o entregues nas m&atilde;os de Deus. Por isso, tamb&eacute;m o nosso dever, ao iniciarmos o novo dia, orar, para que o Senhor mande os seus anjos, a fim de nos livrar de todos os perigos; conforme lemos no Salmo 91.11; &ldquo;Porque aos Seus anjos dar&aacute; ordem a teu respeito, para te guardarem em todos os teus caminhos&rdquo;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Sempre: </strong>Quem vive em total depend&ecirc;ncia de Deus, atrav&eacute;s da ora&ccedil;&atilde;o, &eacute; sempre vitorioso. Orar sempre significa viver as 24 horas do dia em constante comunh&atilde;o com Deus. No deitar,</span></span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">levantar, trabalhar, viajar e com o pensamento sempre voltado para as coisas espirituais. Leia 1 Tessalonicenses 5.17.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>V. ASSUNTOS PRESENTES NUMA ORA&Ccedil;&Atilde;O ADORA&Ccedil;&Atilde;O</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Jo&atilde;o 4.24:<em>&rdquo; Deus &eacute; Esp&iacute;rito, e importa que os que o adoram em esp&iacute;rito e em verdade.&rdquo;</em></span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>CONFISS&Atilde;O</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Daniel 9.20(a): <em>&ldquo;Estando eu ainda falando e orando, e confessando o meu pecado.&rdquo;</em></span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>AGRADECIMENTO</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Salmos 100.4: <em>&ldquo;Entrai pelas portas dele com gratid&atilde;o, e em seus &aacute;trios com louvor...&rdquo;</em></span></span></p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>PETI&Ccedil;&Atilde;O</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Filipenses 4.6: <em>&ldquo;N&atilde;o estejais inquietos por coisa alguma, antes as vossas peti&ccedil;&otilde;es sejam em tudo conhecidas diante de Deus pela ora&ccedil;&atilde;o e s&uacute;plica...&rdquo;</em></span></span></p>

      `,
    imagem: require('@/assets/images/start5.png'),
  },
  {
    titulo: 'Lição 6 - O Discípulo Obediente',
    videoUrl: 'https://www.youtube.com/embed/QFN28g7PwZM?si=LHFCCQ5PHsJzTiat',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A obedi&ecirc;ncia, segundo definem os dicionaristas, &eacute; o ato de submeter-se &agrave; vontade de algu&eacute;m. Nesta li&ccedil;&atilde;o, por&eacute;m, voc&ecirc; vai aprender que se tratando do disc&iacute;pulo crist&atilde;o, a obedi&ecirc;ncia est&aacute; profundamente ligada &agrave; f&eacute;, atrav&eacute;s da qual somos introduzidos &agrave; presen&ccedil;a do Deus invis&iacute;vel, a quem volunt&aacute;ria e conscientemente nos submetemos. Por crermos na Sua soberania sobre todas as coisas, nos dispomos a viver em obedi&ecirc;ncia &agrave; sua Palavra, &agrave; Igreja e &agrave;queles que Ele estabeleceu para ministrar o Seu povo.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>EXEMPLOS DE OBEDI&Ecirc;NCIA</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A obedi&ecirc;ncia &eacute; uma virtude exemplificada em todos os livros da B&iacute;blia. Por&eacute;m, na mesma B&iacute;blia, voc&ecirc; tamb&eacute;m encontra registros sobre a desobedi&ecirc;ncia e suas tristes consequ&ecirc;ncias. Cabe-nos olhar para estes exemplos e tirarmos li&ccedil;&otilde;es que podem nos ajudar a p&ocirc;r em pr&aacute;tica a obedi&ecirc;ncia e n&atilde;o repetir os erros daqueles que n&atilde;o souberam honrar a Deus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.A obedi&ecirc;ncia de Abra&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus fez uma determina&ccedil;&atilde;o ao patriarca Abra&atilde;o baseada em algumas condi&ccedil;&otilde;es. Ele devia deixar sua terra, sua parentela, a casa de seus pais, e seguir para uma terra distante, a qual n&atilde;o conhecia. Estas condi&ccedil;&otilde;es implicavam basicamente em um princ&iacute;pio: obedi&ecirc;ncia. Leia G&ecirc;nesis 12.1.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; importante entendermos que a obedi&ecirc;ncia n&atilde;o imp&otilde;e apenas condi&ccedil;&otilde;es, mas traz tamb&eacute;m privil&eacute;gios. Abra&atilde;o seria pai de uma grande na&ccedil;&atilde;o, aben&ccedil;oado, engrandecido e uma ben&ccedil;&atilde;o para todas as fam&iacute;lias da terra. E mais, aqueles que o aben&ccedil;oassem seriam aben&ccedil;oados; os que o amaldi&ccedil;oassem, seriam amaldi&ccedil;oados.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Vale lembrar, por conseguinte, que todas as vezes que Deus determinou alguma coisa a algu&eacute;m, o intuito n&atilde;o era o obedecer por obedecer, ou simplesmente para fazer valer a Sua soberania. Havia um prop&oacute;sito pr&eacute;-estabelecido. Neste caso, o prop&oacute;sito maior era formar uma na&ccedil;&atilde;o pela qual o redentor, Jesus Cristo, viesse ao mundo, Se Abra&atilde;o n&atilde;o obedecesse, ficaria privado de</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">ter o privil&eacute;gio de constar em sua biografia o registro de progenitor da ra&ccedil;a Judaica que trouxe o&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Salvador&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; da&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Humanidade. N&atilde;o obstante Abra&atilde;o ser um exemplo de obedi&ecirc;ncia houve um momento em sua vida cuja precipita&ccedil;&atilde;o trouxe consequ&ecirc;ncias dr&aacute;sticas que repercutem at&eacute; os dias de hoje. Foi quando Deus prometeu um filho em sua velhice. Induzido por Sara, sua mulher, que j&aacute; n&atilde;o acreditava mais em sua capacidade de gerar nem mesmo por interven&ccedil;&atilde;o divina, Abra&atilde;o acabou tendo um filho com sua escrava Agar, fora do plano de Deus. O resultado &eacute; que logo surgiram os conflitos, principalmente depois que nasceu Isaque, o filho da promessa. Para resumir, ainda hoje as consequ&ecirc;ncias a&iacute; est&atilde;o com as hostilidades entre &aacute;rabes (descendentes de Ismael) e israelenses (descendentes de Isaque). Leia G&ecirc;nesis 15.1-21 e 16.1-16.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. A QUEM DEVEMOS OBEDECER?</strong></span></span></h3>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Devemos obedecer a Deus atrav&eacute;s de Sua Palavra</strong></span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">N&atilde;o obstante &agrave; Sua transcend&ecirc;ncia, ou seja, a Sua elevada posi&ccedil;&atilde;o como Criador de todas as coisas, que habita num alto e sublime trono, Deus se revelou a n&oacute;s atrav&eacute;s da Sua Palavra e de Jesus Cristo, Seu filho. Portanto, ao estudarmos a B&iacute;blia, descobrimos os princ&iacute;pios que Ele estabeleceu para reger a nossa vida como crist&atilde;os nesse mundo. A palavra de Deus &eacute; a nossa regra &aacute;urea de f&eacute;, o padr&atilde;o de obedi&ecirc;ncia para com Deus. O Esp&iacute;rito Santo, por sua vez, ilumina a nossa mente e nos ajuda a descobrir como p&ocirc;r em pr&aacute;tica em nosso cotidiano os mandamentos b&iacute;blicos. 2 Tim&oacute;teo 3.16-17.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Devemos obedecer &agrave; Igreja</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A Igreja &eacute; o fiel instrumento comunicativo do plano de salva&ccedil;&atilde;o na pessoa de Jesus Cristo. &Agrave; ela, estamos ligados mediante o novo nascimento. Assim sendo, devemos obedi&ecirc;ncia &agrave; Igreja. No primeiro conc&iacute;lio (reuni&atilde;o de l&iacute;deres) da Igreja, em Jerusal&eacute;m, para discutir a quest&atilde;o do legalismo, relatado em Atos 15.1-35, est&aacute; claro que ela teve participa&ccedil;&atilde;o nas decis&otilde;es sobre o que os gentios deviam ou n&atilde;o acatar.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; sempre bom lembrar que esta obedi&ecirc;ncia &eacute; &agrave; luz da Palavra, e n&atilde;o ao contr&aacute;rio. N&atilde;o &eacute; a igreja que estabelece o que a B&iacute;blia ensina, mas a B&iacute;blia que estabelece o que a Igreja deve fazer. Tudo quanto ela faz ou ensina n&atilde;o pode basear-se em textos isolados, mas nos princ&iacute;pios gerais da B&iacute;blia. Um princ&iacute;pio s&oacute; pode ser assim considerado, se tiver apoio em toda a Palavra de Deus. Se n&atilde;o, pode ser uma boa opini&atilde;o, mas n&atilde;o um princ&iacute;pio b&iacute;blico. O grande erro da Igreja Romana, entre outros ao longo da Hist&oacute;ria, foi que, para justificar suas heresias, inverteu o papel: a sua tradi&ccedil;&atilde;o passou a ser mais importante do que a B&iacute;blia e a arbitrar o que ela ensina.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Devemos obedecer aos nossos pastores</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Se a B&iacute;blia &eacute; o nosso padr&atilde;o, ela determina que devemos tamb&eacute;m obedecer aos nossos pastores. Leia Hebreus 13.17. N&atilde;o obstante a salva&ccedil;&atilde;o ser individual, voc&ecirc; descobriu que a responsabilidade de ministrar &agrave;s nossas vidas &eacute; do pastor, de quem Deus vai cobrar a presta&ccedil;&atilde;o de contas um dia. Cabe-lhe, portanto, expor a Palavra para o nosso ensino e crescimento espiritual. De nossa parte, como determina a B&iacute;blia, cabe-nos atentar para os seus conselhos, ouvir-lhes as recomenda&ccedil;&otilde;es e obedecer-lhe, sempre consultando a B&iacute;blia, pois este &eacute; um direito de todos os crist&atilde;os. O direito de ter acesso &agrave; B&iacute;blia Sagrada para comparar o ensino que est&aacute; recebendo com a Palavra de Deus. Aqui vale a seguinte cautela: se, por acaso, o seu pensamento est&aacute; divergindo do que fala a Palavra de Deus e do que pensa a unanimidade da igreja, acenda uma luz de advert&ecirc;ncia e procure um di&aacute;logo sadio com sua lideran&ccedil;a.</span></span></p>
</div>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. EFEITOS DA OBEDI&Ecirc;NCIA</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Para finalizar, veja na B&iacute;blia os efeitos da obedi&ecirc;ncia na vida dos que a praticam:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus t&ecirc;m o Esp&iacute;rito Santo: </strong>&ldquo;E n&oacute;s somos testemunhas acerca destas palavras. N&oacute;s e tamb&eacute;m o Esp&iacute;rito Santo, que Deus deu &agrave;queles que lhe obedecem.&rdquo; (Atos 5.32)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus s&atilde;o inabal&aacute;veis: </strong>&ldquo;Todo aquele, pois, que escuta estas minhas palavras e as pratica, assemelh&aacute;-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha.&rdquo; (Mateus 7.24)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus tem sua obedi&ecirc;ncia reconhecida: </strong>&ldquo;Quanto &agrave; vossa obedi&ecirc;ncia &eacute; ela conhecidas de todos. Comprazo-me, pois, em v&oacute;s, e quero que sejais s&aacute;bios no bem, mas s&iacute;mplices no mal.&rdquo; (Romanos 16.19)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Os que obedecem a Deus glorificam-lhe: </strong>&ldquo; Visto como, na prova desta administra&ccedil;&atilde;o, glorificam a Deus pela submiss&atilde;o que confessais quanto ao evangelho de Cristo, e pela liberalidade de vossos dons para com eles, e para com todos.&rdquo; (2 Cor&iacute;ntios 9.13)</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Quem obedece a Deus &eacute; irrepreens&iacute;vel: </strong>&ldquo;De sorte que, meus amados, assim como sempre obedecestes, n&atilde;o s&oacute; na minha presen&ccedil;a, mas muito mais agora na minha aus&ecirc;ncia, assim tamb&eacute;m operai a vossa salva&ccedil;&atilde;o com temor e tremor (...) para que sejais irrepreens&iacute;veis e sinceros, filhos de Deus inculp&aacute;veis no meio duma gera&ccedil;&atilde;o corrompida e perversa, entre a qual resplandeceis como astros no mundo.&rdquo; (Filipenses 2.12-15)</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/start6.png'),
  },
  {
    titulo: 'Lição 7 - O Dizimista e Ofertante',
    videoUrl: 'https://www.youtube.com/embed/iWb4GuuPmg8?si=eDIevtRkunejqxKT',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Dizimar e ofertar n&atilde;o &eacute; obriga&ccedil;&atilde;o, mas um ato de fidelidade e gratid&atilde;o. &Eacute; tornar-se participante com Deus na obra de evangeliza&ccedil;&atilde;o no mundo. &Eacute; o privil&eacute;gio de tirar uma porcentagem de toda a renda pessoal e investir nos neg&oacute;cios de Deus aqui na terra.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. O D&Iacute;ZIMO NO ANTIGO TESTAMENTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Devolver o d&iacute;zimo, no Antigo Testamento, constitu&iacute;a-se em separar a d&eacute;cima parte do produto da terra e dos rebanhos para o sustento do santu&aacute;rio de Deus e dos sacerdotes.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O d&iacute;zimo nos dias de Abra&atilde;o</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A origem do ato de dizimar perde-se no tempo, sendo anterior a Mois&eacute;s. No entanto, a primeira refer&ecirc;ncia b&iacute;blica ao fato relaciona-se aos dias de Abra&atilde;o. Em Genesis 14.20 est&aacute; escrito que Abra&atilde;o pagou a um rei de nome Melquisedeque o dizimo de tudo, sendo que, neste caso, n&atilde;o foi do produto da terra nem dos rebanhos, e sim do despojo da guerra, costume tamb&eacute;m observado nos tempos antigos. Leia Hebreus 7.2, Lev&iacute;tico 27.30-34 e Deuteron&ocirc;mio 12.5-6.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O d&iacute;zimo nos dias de Mois&eacute;s</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nos dias de Mois&eacute;s, o d&iacute;zimo passou a exercer importante papel na vida religiosa do povo israelita. Leia Deuteron&ocirc;mio 26.1-15. Desta forma, n&atilde;o s&oacute; a casa de Deus era suprida, como tamb&eacute;m mantida a tribo de Levi, respons&aacute;vel pela organiza&ccedil;&atilde;o de todas as outras tribos. Devolver o d&iacute;zimo &eacute;, portanto, sinal de um cora&ccedil;&atilde;o que reconhece o senhorio de Deus sobre todas as coisas. Por isso, Malaquias chegou a chamar de roubadores de Deus &agrave;queles que n&atilde;o pagavam os seus d&iacute;zimos. Leia Malaquias 3.8-10.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. O D&Iacute;ZIMO NO NOVO TESTAMENTO</strong></span></span></h3>
</div>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O d&iacute;zimo n&atilde;o ficou restrito aos tempos do Antigo Testamento. O escritor da Ep&iacute;stola aos Hebreus estabelece uma vincula&ccedil;&atilde;o direta entre esta pr&aacute;tica e o Novo Testamento quando menciona o fato de Abra&atilde;o ter pago o d&iacute;zimo de tudo a Melquisedeque. Vale lembrar, inclusive, que o mesmo autor afirma ser Cristo sumo Sacerdote segundo a ordem de Melquisedeque (Hebreus 5.10). Ora, isto quer dizer que, se a ordem &eacute; a mesma, os deveres e privil&eacute;gios continuam tamb&eacute;m os mesmos, sem altera&ccedil;&atilde;o, e isto inclui o d&iacute;zimo. Pagar o d&iacute;zimo, portanto, &eacute; dar sequ&ecirc;ncia, em Cristo, ao sacerd&oacute;cio de Melquisedeque. Leia Hebreus 7-3.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Jesus e o D&iacute;zimo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O pr&oacute;prio Cristo n&atilde;o passou ao largo do d&iacute;zimo. Leia Mateus 23.23-24. A pr&aacute;tica do d&iacute;zimo entre os contempor&acirc;neos de Jesus tornou-se legalista e de falsa espiritualidade. Os escribas e fariseus cumpriam esta determina&ccedil;&atilde;o para serem vistos e honrados pelos homens, e n&atilde;o como fruto sincero de cora&ccedil;&otilde;es agradecidos. Era apenas apar&ecirc;ncia, nada mais. Todo o texto de Mateus 23 enfatiza este lado da arrog&acirc;ncia, da falsa religiosidade, onde a hipocrisia se reveste de justi&ccedil;a para tornar-se a gl&oacute;ria de cora&ccedil;&otilde;es in&iacute;quos e apodrecidos.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O D&iacute;zimo nas Ep&iacute;stolas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ainda que a palavra d&iacute;zimo n&atilde;o apare&ccedil;a nos ensinos do ap&oacute;stolo Paulo, ela est&aacute; impl&iacute;cita todas as vezes em que ela admoesta sobre a contribui&ccedil;&atilde;o. Leia 1 Cor&iacute;ntios 16.2. Duas coisas aparecem no texto: as contribui&ccedil;&otilde;es eram feitas no primeiro dia da semana (domingo), proporcionalmente &agrave; prosperidade de cada um. O d&iacute;zimo &eacute; exatamente isto. Quando se paga 10%, ele sempre ser&aacute; proporcional. Em outras palavras, quanto mais o crente prospera, mais contribui. O ap&oacute;stolo tamb&eacute;m reitera o conceito de que a contribui&ccedil;&atilde;o deve ser oriunda da motiva&ccedil;&atilde;o correta. Ele afirma: &ldquo;N&atilde;o com tristeza, ou por necessidade; porque Deus ama ao que d&aacute; com alegria&rdquo;. (Leia 2 cor&iacute;ntios 9-7).</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS BEN&Ccedil;&Atilde;OS QUE ACOMPANHAM OS D&Iacute;ZIMOS</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>B&ecirc;n&ccedil;&atilde;os para a Igreja</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Se todos os crist&atilde;os pagassem o d&iacute;zimo n&atilde;o haveria necessidade da Igreja local lan&ccedil;ar m&atilde;o de campanhas financeiras para a execu&ccedil;&atilde;o de sua tarefa. Malaquias afirmou que o d&iacute;zimo &eacute; para que haja &ldquo;mantimento na casa do Senhor&rdquo;. Aplicando-se ao contexto de hoje, &eacute; o meio que a Igreja tem aqui na terra para realizar a evangeliza&ccedil;&atilde;o, enviar mission&aacute;rios, manter os seus funcion&aacute;rios, cuidar da assist&ecirc;ncia social, construir templos para abrigar o povo e suprir o dia- a-dia da administra&ccedil;&atilde;o.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por exemplo: como a igreja poder&aacute; ser aben&ccedil;oada com o crescimento, se lhe faltam os recursos parar adquirir folhetos, enviar obreiros, dar suporte aos programas de evangelismo e ajudar no cuidado aos carentes da igreja e da comunidade? O d&iacute;zimo &eacute; para isto. N&atilde;o tem outra finalidade.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&nbsp; &nbsp; Ben&ccedil;&atilde;o para quem devolve o D&iacute;zimo</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A promessa dada por Deus atrav&eacute;s de Malaquias imp&otilde;e uma condi&ccedil;&atilde;o: primeiro trazer os d&iacute;zimos, depois fazer prova do Senhor, que garante derramar ben&ccedil;&atilde;o tal, trazendo maior abastan&ccedil;a. Por&eacute;m, &eacute; preciso que fique claro: isto n&atilde;o anula as afli&ccedil;&otilde;es da vida, onde podem aparecer os momentos de sequid&atilde;o. Agora, com certeza, garante vit&oacute;ria aos que, com fidelidade em tudo, atravessam estas horas mais dif&iacute;ceis, pois a palavra de Deus jamais cai por terra.</span></span></p>
</div>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Fazer prova aqui n&atilde;o &eacute; chantagear o Senhor, mas saber que ele &eacute; rec&iacute;proco para conosco, se cumprirmos a nossa parte.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Veja algumas coisas que acontecem quando, motivado pela vis&atilde;o correta, o crente dizima:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Sente-se recompensado por ser parte ativa na obra de Deus;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Torna-se exemplo para os demais crist&atilde;os;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Deus lhe &eacute; rec&iacute;proco em propor&ccedil;&otilde;es bem maiores</span></span></li>
</ol>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. A OBRA MISSION&Aacute;RIA E A VIS&Atilde;O DA CRIEP</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">Ide por todo mundo e pregai o evangelho</span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O texto de Marcos 16.15 indica que todo Crist&atilde;o que desfruta da rica oportunidade de conhecer a Cristo deve anunciar este evangelho de uma maneira &uacute;nica em ess&ecirc;ncia e m&uacute;ltipla a&ccedil;&atilde;o. Tal inspira&ccedil;&atilde;o em expandir esta boa nova recebida e anunciar esta paz, requer boa vontade dos membros da comunidade em servir. Esta sinergia &eacute; realizada quando a membresia da igreja est&aacute; engajada juntamente com a comunidade em fazer diferen&ccedil;a num mundo t&atilde;o carente e sedento de Deus. A CRIEP busca em suas atividades, dar toda estrutura e suporte para que a obra de Deus seja realizada com excel&ecirc;ncia e prud&ecirc;ncia por todos que desejam realizar esta pr&aacute;tica.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A vis&atilde;o mission&aacute;ria da CRIEP tem se amadurecido ao longo dos anos com o foco em investir em pessoas.</span></span></p>

      `,
    imagem: require('@/assets/images/start7.png'),
  },
  {
    titulo: 'Lição 8 - O Discipulo e o Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/woaRLoYujx0?si=BWyOTmylSClQDIpj',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; imposs&iacute;vel escrever sobre qualquer dos temas destas li&ccedil;&otilde;es sem fazer refer&ecirc;ncia expl&iacute;cita ou impl&iacute;cita &agrave; pessoa aos atos do Esp&iacute;rito Santo. N&atilde;o obstante, se faz necess&aacute;rio tratar deste assunto com clareza, a fim de tirar d&uacute;vidas que, porventura, existiam por parte do disc&iacute;pulo sobre a terceira pessoa da trindade. As escrituras d&atilde;o muitas provas da personalidade do Esp&iacute;rito Santo. Ele n&atilde;o &eacute; apenas uma influ&ecirc;ncia, for&ccedil;a ativa ou energia c&oacute;smica, conforme ensinam algumas religi&otilde;es; mas, sim, um com o Pai e com o Filho, ou seja, o Esp&iacute;rito Santo &eacute; Deus. Leia 1 Jo&atilde;o 5.6-7.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. A NATUREZA DO ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Provas b&iacute;blicas da Sua divindade</strong></span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Em G&ecirc;nesis 1.2 voc&ecirc; encontra a primeira refer&ecirc;ncia ao Esp&iacute;rito Santo, o qual participou ativamente da cria&ccedil;&atilde;o. O Esp&iacute;rito Santo &eacute; da mesma ess&ecirc;ncia divina que o Pai e o Filho, pois possui os mesmos atributos destes. Vejamos:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipot&ecirc;ncia: </strong>Pode todas as coisas. J&oacute; 42.2;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onisci&ecirc;ncia: </strong>Seu saber &eacute; perfeito e infinito em rela&ccedil;&atilde;o ao passado, presente e futuro. Ele &eacute; eterno: n&atilde;o tem princ&iacute;pio e nem fim. Salmos 1.39 1-4, 1 Cr 28.9;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Onipresen&ccedil;a: </strong>Conhece e sonda todos os atos e pensamentos, pois est&aacute; presente em todo lugar, de modo pleno. Salmo 139.</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Provas de sua personalidade: </strong>O Esp&iacute;rito Santo &eacute; uma pessoa. Ele possui caracter&iacute;sticas e personalidade como: intelecto, vontade e sentimento. Onde se observa, claramente, a sua capacidade de examinar, conhecer e interceder. Leia Romanos 8.27 e 1 Cor&iacute;ntios 2.10,11,16.</span></span></p>
</div>

<p>&nbsp;</p>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ele se entristece e tamb&eacute;m tem zelo de n&oacute;s. Leia Tiago 4-5. Considere, ainda, algumas atividades que atesta a personalidade do Esp&iacute;rito Santo:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ele revela: </strong>A B&iacute;blia, revela&ccedil;&atilde;o de Deus &agrave; humanidade, foi escrita por homens e mulheres inspiradas pelo Esp&iacute;rito Santo. Leia 2 Pedro 1.21;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ele ensina: </strong>O Senhor Jesus afirmou aos disc&iacute;pulos que o Consolador os ensinaria todas as coisas, e os farias lembrar de tudo quanto Ele (Jesus) havia dito. Leia Jo&atilde;o 14.26;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ele intercede: </strong>O ap&oacute;stolo Paulo disse que o Esp&iacute;rito Santo &ldquo;intercede por n&oacute;s com gemidos inexprim&iacute;veis&rdquo;. Leia Romanos 8.26;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Ordena: </strong>A igreja de Antioquia da S&iacute;ria foi a primeira a enviar obreiros ao campo mission&aacute;rio. Por&eacute;m, a ordem para isto foi dada pelo Esp&iacute;rito Santo. Leia Atos 13-2;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Testifica: </strong>Se n&atilde;o fosse uma pessoa, seu testemunho a favor de Jesus Cristo seria nulo. Leia Jo&atilde;o 15-26; 1 Jo&atilde;o 5-6,7;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Fala &agrave; igreja: </strong>Atrav&eacute;s dos ministros da Palavra e de v&aacute;rias outras maneira, Ele fala &agrave; igreja. Leia apocalipse 2.7-11, 17-29; 3.6-22;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Convida &agrave; salva&ccedil;&atilde;o: </strong>Convence o pecador a aceitar Cristo como Salvador. Leia Apocalipse 22.17.</span></span></li>
</ol>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. NOMES E S&Iacute;MBOLOS DO ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Voc&ecirc; aprendeu que o Esp&iacute;rito Santo &eacute; uma pessoa, pois possui personalidade. A ele s&atilde;o atribu&iacute;das &agrave;s mesmas qualidades inerentes ao Pai e Filho, e tamb&eacute;m, &eacute; lhe dado, de acordo com as diversas fun&ccedil;&otilde;es, v&aacute;rios nomes e s&iacute;mbolos.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguem alguns de seus <strong>NOMES:</strong></span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de Deus: </strong>Significa que ele &eacute; &ldquo;executivo&rdquo; da divindade. Em Lucas 11.20, Jesus afirma que expulsa os dem&ocirc;nios pelo &ldquo;dedo de Deus&rdquo;;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de Cristo: </strong>Este nome, conferido &agrave; terceira pessoa da Trindade, indica que o Esp&iacute;rito &eacute; enviado por Cristo para o glorificar e habitar no salvo. Romanos 8;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Consolador: </strong>Perto de findar o Seu minist&eacute;rio terreno, o Senhor sabia que, brevemente, teria de deixar os Seus disc&iacute;pulos. Contudo, eles n&atilde;o ficariam sozinhos, pois enviaria o &ldquo;outro Consolador&rdquo;, a fim de ficar com eles para sempre. Leia 2 Cor&iacute;ntios 1.4;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de verdade: </strong>O Esp&iacute;rito do engano e do erro opera no mundo, por isso, o Senhor enviou o Esp&iacute;rito de verdade para preservar os Seus das ciladas de Satan&aacute;s. 1 Jo&atilde;o 4.6;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de Gra&ccedil;a: </strong>A gra&ccedil;a &eacute; concedida aos crist&atilde;os a fim de viverem em santidade e vencerem as fraquezas, pr&oacute;prias da carne. Leia 2 Cor&iacute;ntios 12.9;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>O Esp&iacute;rito de vida: </strong>O poder do pecado e da morte n&atilde;o tem efeito sobre aqueles que receberam o Esp&iacute;rito de vida. Neste vers&iacute;culo, o ap&oacute;stolo Paulo afirma: &ldquo;Porque a lei do Esp&iacute;rito de vida, em Cristo Jesus, me livrou da lei do pecado e da morte&rdquo;. Leia Romanos 8.2.</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Seguem alguns <strong>S&Iacute;MBOLOS:</strong></span></span></p>
</div>

<p>&nbsp;</p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Eles indicam a a&ccedil;&atilde;o divina da terceira pessoa da trindade, atrav&eacute;s dos v&aacute;rios minist&eacute;rios que as pessoas recebem de Deus. Consideremos alguns:</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Fogo: </strong>Este s&iacute;mbolo fala da a&ccedil;&atilde;o purificadora do Esp&iacute;rito Santo, na vida do crente. Ao mesmo tempo diminui a for&ccedil;a do pecado dentro de n&oacute;s; o fogo do Esp&iacute;rito assinala a presen&ccedil;a de Deus na vida do crente ao ilumin&aacute;-lo e aquec&ecirc;-lo.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Vento: </strong>No encontro com Nicodemos (Jo&atilde;o 3.8), o Senhor referiu-se &agrave; a&ccedil;&atilde;o do vento para ilustrar a opera&ccedil;&atilde;o do Esp&iacute;rito Santo na obra de regenera&ccedil;&atilde;o do Pecador. &Eacute; ele que convence a pessoa da necessidade de arrepender-se dos seus pecados e receber, pela f&eacute;, mediante a gra&ccedil;a divina, a salva&ccedil;&atilde;o consumada no sacrif&iacute;cio do Calv&aacute;rio pelo Filho de Deus. O vento simboliza a obra regeneradora do Esp&iacute;rito Santo. Tal como o vento, assim &eacute; o Esp&iacute;rito Santo. Percebe-se a Sua real opera&ccedil;&atilde;o na vida do crente e da Igreja, embora n&atilde;o se possa v&ecirc;-lo como &eacute;. Seus atos independem da vontade humana, pois Ele &eacute; Deus Soberano.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>&Aacute;gua: </strong>Em Jo&atilde;o 7.37, o Senhor Jesus identifica-se como a verdadeira fonte de &aacute;gua viva, isto &eacute;, a salva&ccedil;&atilde;o consumada por Ele e conferida aos que O aceitarem pelo Esp&iacute;rito Santo. Ele afirmou: &ldquo;Se algu&eacute;m tem sede, venha a mim e beba. Quem cr&ecirc; em mim, como diz a escritura rios de &aacute;gua viva correr&atilde;o do seu ventre.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Azeite: </strong>&Eacute; o mais conhecido dos s&iacute;mbolos atribu&iacute;dos &agrave; terceira pessoa da trindade. No Antigo Testamento, era usado para consagrar os sacerdotes e os reis de Israel. Ser ungido com o azeite significa estar revestido da autoridade de Deus para determinada tarefa espiritual ou secular. A Igreja primitiva, atrav&eacute;s dos presb&iacute;teros, ungia os enfermos, que saravam, ap&oacute;s a ora&ccedil;&atilde;o da f&eacute;. Leia Tiago 5.14-1;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Pomba: </strong>Esta ave simboliza brandura, inoc&ecirc;ncia, do&ccedil;ura, pureza, amabilidade e paz. Por ocasi&atilde;o do batismo de Jesus, o Esp&iacute;rito Santo desceu do C&eacute;u em forma corp&oacute;rea de uma pomba e pousou sobre o Filho de Deus para indicar que aquele era o Messias. Isto n&atilde;o significa que a terceira pessoa da trindade tenha esta apar&ecirc;ncia, pois, como Esp&iacute;rito, n&atilde;o possui forma que se possa definir.</span></span></li>
</ol>

<h3>&nbsp;</h3>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll. AS OBRAS DO ESP&Iacute;RITO SANTO</strong></span></span></h3>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>No pecador: </strong>O Esp&iacute;rito regenera a natureza pecaminosa do homem, convence-o dos seus delitos e pecados, leva-o ao arrependimento, &agrave; confiss&atilde;o e ao abandono dos mesmos, pela f&eacute; no sacrif&iacute;cio do Filho de Deus. Deste modo, regenerado pelo Esp&iacute;rito, o pecador torna-se uma nova criatura. Leia 2 Cor&iacute;ntios 5.17;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>No Crist&atilde;o: </strong>Consola, conduz, ensina todas as coisas e lembra o que o Senhor ensinou, concede poder para testemunhar de Cristo, intercede pelos crist&atilde;os em suas ora&ccedil;&otilde;es e santifica.</span></span></li>
</ol>

      `,
    imagem: require('@/assets/images/start8.png'),
  },
  {
    titulo: 'Lição 9 - Vivendo Cheio do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/1J4Gowxacow?si=-ut_UrvdJ9Vj6BwH',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Viver cheio do Esp&iacute;rito Santo significa ser alegre, confiante, revestido do poder de Deus. Por interm&eacute;dio desta virtude, muitos crist&atilde;os enfrentaram os perigos com muita coragem. Os que realmente s&atilde;o cheios do Esp&iacute;rito Santo, aceitaram o mart&iacute;rio, cientes de que eram bem- aventurados. Isto s&oacute; foi poss&iacute;vel porque experimentaram uma vida repleta no Esp&iacute;rito Santo.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. TODO O CRENTE RECEBE O ESP&Iacute;RITO SANTO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No momento da convers&atilde;o, quando voc&ecirc; aceita a Jesus como Salvador, recebe o Esp&iacute;rito Santo. Foi Ele quem, na hora da sua convers&atilde;o, atuou em seu ser para que se decidisse por Cristo. Ele lhe convenceu que era pecador e que necessitava do arrependimento para alcan&ccedil;ar o perd&atilde;o de Deus. No instante em que levantou as m&atilde;os, como sinal de aceita&ccedil;&atilde;o, voc&ecirc; sentiu uma alegria incontida. &Eacute; o momento em que a terceira pessoa da trindade passa a habitar na vida do crist&atilde;o, que se torna o templo do Deus Alt&iacute;ssimo. Leia 1 Cor&iacute;ntios 6.19.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Como promessa e garantia da salva&ccedil;&atilde;o (2 Cor&iacute;ntios 1.22), dentre as muitas fun&ccedil;&otilde;es do Esp&iacute;rito Santo e de tudo o que a B&iacute;blia diz a respeito de Sua pessoa, destaca-se o fato de ser Ele o penhor, ou seja, a garantia de nossa futura heran&ccedil;a em Cristo:</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&ldquo;Em cristo tamb&eacute;m v&oacute;s estais, depois que ouvistes a palavra da verdade, o evangelho da vossa salva&ccedil;&atilde;o; e, tendo nele tamb&eacute;m crido, fostes selados com o Esp&iacute;rito Santo da promessa; o qual &eacute; o penhor da nossa heran&ccedil;a, para reden&ccedil;&atilde;o da promessa de Deus, para louvor da sua gl&oacute;ria&rdquo; (Ef&eacute;sios 1.13,14). &Eacute; o Esp&iacute;rito Santo, que mediante a Palavra de Deus e por todos os meios da gra&ccedil;a, nos capacita a atingir a gl&oacute;ria eterna de Deus. Este selo &eacute; o penhor do futuro que nos aguarda aqui na terra e na eternidade.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. OQUE &Eacute; O BATISMO NO ESP&Iacute;RITO SANTO?</strong></span></span></h3>

<p><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1. &Eacute; uma promessa do Pai (Joel 2.28,29)</strong></span></span></p>
</div>

<div>
<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Deus fez muitas promessas ao homem, sendo o batismo no Esp&iacute;rito Santo uma delas. No passado, o Esp&iacute;rito Santo manifestava-se de uma forma espec&iacute;fica. De acordo com a necessidade, ele operava na vida dos servos de Deus. Leia Ex&ocirc;do 35.30-35. No entanto, Deus prometeu derramar o Seu Esp&iacute;rito sobre todos os homens e mulheres, para que se profetizassem, tivesse sonhos etc. O batismo no Esp&iacute;rito Santo &eacute; uma ben&ccedil;&atilde;o que est&aacute; ao alcance de todos os que creem.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.&Eacute; um revestimento do poder (Marcos 16.17,18)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os disc&iacute;pulos, antes do batismo no Esp&iacute;rito Santo, eram t&iacute;midos e medrosos. Inclusive, no dia da pris&atilde;o de Jesus, todos fugiram, com exce&ccedil;&atilde;o de Pedro, que acompanhou at&eacute; o local onde o Filho de Deus foi julgado. Na casa do sumo-sacerdote Caif&aacute;s, o amigo de Cristo, que prometeu segui-lo at&eacute; a morte, com medo de morrer, negou-o tr&ecirc;s vezes. No entanto, no dia de Pentecostes, revestido do Poder de Deus, quando os Judeus, atra&iacute;dos pelo barulho das l&iacute;nguas estranhas que os disc&iacute;pulos falavam, declaravam que os seguidores de Jesus estavam embriagados, Pedro respondeu: &ldquo;Var&otilde;es judeus, e todos os que habitais em Jerusal&eacute;m, seja-vos isto not&oacute;rio, e escutai as minhas palavras. Estes homens n&atilde;o est&atilde;o embriagados, como v&oacute;s pensais, sendo a terceira hora do dia. Mas isto &eacute; o que foi dito pelo profeta Joel&rdquo; (Atos 2.14- 16).</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No t&eacute;rmino de sua mensagem, quase tr&ecirc;s mil pessoas aceitaram a Jesus como salvador. Com certeza, todos os revestidos do poder de Deus s&atilde;o mais do que vencedores.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>IV. EVID&Ecirc;NCIAS DO ESP&Iacute;RITO SANTO</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Os dons espirituais (1 Cor&iacute;ntios 12.8-10)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">S&atilde;o os seguintes: a palavra da sabedoria, a palavra da ci&ecirc;ncia, a f&eacute;, os dons de curar, a opera&ccedil;&atilde;o de maravilhas, a profecia, o dom de discernir os esp&iacute;ritos, a variedade de l&iacute;nguas e a interpreta&ccedil;&atilde;o de l&iacute;nguas. Os dons espirituais s&atilde;o necess&aacute;rios para a edifica&ccedil;&atilde;o espiritual e o crescimento da Igreja. S&atilde;o concedidos gratuitamente e devem ser utilizados, tamb&eacute;m, de gra&ccedil;a. N&oacute;s o recebemos mediante o nosso pedido a Deus. Se voc&ecirc; deseja um ou mais destes dons, comece a busc&aacute;-los ainda hoje, com f&eacute; e o Senhor lhe conceder&aacute;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Obs: outras passagens b&iacute;blicas nos apresentam outros dons, por&eacute;m voc&ecirc; os conhecer&aacute; no CDV (Curso de Despertamento Vocacional).</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.O fruto do Esp&iacute;rito (G&aacute;latas 5.22)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No momento da regenera&ccedil;&atilde;o, o novo homem passa a ter a mente de Cristo e a produzir o fruto do Esp&iacute;rito, que podemos comparar a uma mexerica com nove gomos, cujo nomes diferem um dos outros. S&atilde;o eles: amor, gozo, paz, longanimidade, benignidade, bondade, f&eacute;, mansid&atilde;o e dom&iacute;nio pr&oacute;prio. N&atilde;o s&atilde;o diversos frutos, mas um s&oacute;, constitu&iacute;dos por nove virtudes diferentes. Jesus orou esta sublime ora&ccedil;&atilde;o: &ldquo;porque pelo fruto se conhece a &aacute;rvore&rdquo; (Mateus 12.33). Isto significa dizer que se conhece a pessoa que realmente nasceu de novo, quando ela produz o fruto do Esp&iacute;rito, manifestado nas nove virtudes que lhe s&atilde;o peculiares.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Obs: Se a pessoa n&atilde;o souber canalizar os dons espirituais a favor da constru&ccedil;&atilde;o do fruto do Esp&iacute;rito, correr&aacute; o risco de perder a salva&ccedil;&atilde;o. Leia Mateus 7.22</span></span></p>
</div>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>V. O ESP&Iacute;RITO SANTO COMO L&Iacute;DER</strong></span></span></h2>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Ensina todas as coisas (Jo&atilde;o 14.26)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Jesus declarou aos disc&iacute;pulos que eles seriam odiados e levados aos tribunais por causa de Seu nome, mas que eles n&atilde;o deviam se preocupar, pois o Esp&iacute;rito Santo lhes ensinaria tudo o que deveriam responder aos seus inimigos. Hoje tamb&eacute;m, o Esp&iacute;rito Santo nos ensina. Por n&oacute;s mesmos, nada sabemos falar. Mas quando abrirmos a nossa boca, a terceira pessoa da trindade nos enche de sabedoria e gra&ccedil;a, para pregarmos o evangelho de Cristo.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Santifica-nos (2 Tessalonicenses 2.13)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Esp&iacute;rito Santo &eacute; quem nos regenera. A partir do momento em que aceitamos a Jesus, ele inicia o processo de santifica&ccedil;&atilde;o. Logo ap&oacute;s o novo nascimento, come&ccedil;amos a crescer espiritualmente at&eacute; chegarmos a estatura de var&otilde;es perfeitos (Ef&eacute;sios 4-13). Realmente, as tr&ecirc;s pessoas da trindade s&atilde;o respons&aacute;veis pela salva&ccedil;&atilde;o da humanidade: o Pai enviou o Filho. Este, por sua morte, redimiu-nos, e o Esp&iacute;rito Santo tem a incumb&ecirc;ncia de nos santificar. Quando pecamos, sentimos, por interm&eacute;dio dEle, a nossa culpa. Nos arrependemos as nossas faltas, e Ele purifica-nos de todo o pecado por interm&eacute;dio do sangue de Jesus.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Dirige a Igreja (Jo&atilde;o 16.13)</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No dia de Pentecostes, o Esp&iacute;rito Santo assumiu a dire&ccedil;&atilde;o da Igreja. Com a sua infinita sabedoria, Ele dirige os passos da eleita de Cristo desde a sua funda&ccedil;&atilde;o, e dirigir&aacute; at&eacute; o dia do arrebatamento. No decorrer deste tempo, Satan&aacute;s investe contra a Noiva do cordeiro, mas jamais foi ou ser&aacute; bem sucedido, muito pelo contr&aacute;rio, as portas do inferno n&atilde;o prevalecem e nunca&nbsp;&nbsp;&nbsp; prevalecer&atilde;o&nbsp;&nbsp;&nbsp; contra&nbsp;&nbsp;&nbsp; a&nbsp;&nbsp;&nbsp; igreja.&nbsp;&nbsp;&nbsp; Leia&nbsp;&nbsp;&nbsp; Mateus&nbsp;&nbsp;&nbsp; 16.18</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Por isso, viver cheio do Esp&iacute;rito Santo significa ser dirigido pela terceira pessoa da trindade, com a certeza de que o crente marcha para a gl&oacute;ria, seguro e confiante que chegar&aacute; ao c&eacute;u, pois n&atilde;o &eacute; conduzido por simples seres humanos, mas por uma pessoas divina.</span></span></p>

<p style="margin-left:14.25pt">&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>#Dicas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Nos dias atuais, viver cheio do Esp&iacute;rito Santo de Deus &eacute; mais do que uma necessidade. E a promessa do revestimento de poder est&aacute; &agrave; disposi&ccedil;&atilde;o de todos os que creem. Frequente os cultos, as reuni&otilde;es de ora&ccedil;&otilde;es, as vig&iacute;lias, e quando voc&ecirc; menos esperar, ser&aacute; cheio do Esp&iacute;rito Santo;</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Ap&oacute;s receber esta ben&ccedil;&atilde;o, uma promessa de Deus para todos os que aceitam a Jesus como salvador, voc&ecirc; deve buscar diligentemente os dons espirituais, a fim de que seja um instrumento nas m&atilde;os de Deus para a edifica&ccedil;&atilde;o da Igreja;</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Cultive tamb&eacute;m o fruto do Esp&iacute;rito para que seus atos venham provas a todos que voc&ecirc; &eacute; uma nova criatura possuidora da natureza de Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/start9.png'),
  },
  {
    titulo: 'Lição 10 - Os dons do Espírito Santo',
    videoUrl: 'https://www.youtube.com/embed/ygEdcGRtvdY?si=8Uu12szTbR4sVWv5',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os dons espirituais formam a base do crescimento espiritual e capacita o crente para o servi&ccedil;o na obra de Deus. Seu exerc&iacute;cio &eacute; fundamental, tanto na adora&ccedil;&atilde;o como na edifica&ccedil;&atilde;o da Igreja. S&atilde;o eles: Palavra de Sabedoria, Palavra de Ci&ecirc;ncia, Discernimento dos esp&iacute;ritos, Cura, Opera&ccedil;&atilde;o de Maravilhas, F&eacute;, Variedades de L&iacute;nguas, Interpreta&ccedil;&atilde;o de L&iacute;nguas e Profecia.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Segue uma breve explica&ccedil;&atilde;o de cada dom:</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>1.Palavra da Sabedoria</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Muitas pessoas no mundo s&atilde;o conhecedoras de muitos assuntos, por&eacute;m poucas conseguem transformar conhecimento acumulado em falas e pr&aacute;ticas s&aacute;bias em sua vida e na vida dos outros.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A Palavra da Sabedoria &eacute; o dom dado pelo Esp&iacute;rito que capacita o crente a perceber, falar e agir de maneira que agrada a Deus e beneficia o pr&oacute;ximo. Leia Tiago 3.17 e 1 Cor&iacute;ntios 2.6-8.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>2.Palavra de Ci&ecirc;ncia/ Conhecimento</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esse dom capacita o crist&atilde;o a absorver conceitos profundos da Palavra de Deus. Conceitos esses que nem todos conseguem ao longo da caminhada crist&atilde;.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Observa&ccedil;&atilde;o: As Palavras de Ci&ecirc;ncia e de Sabedoria se completam.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>3.Discernimento dos esp&iacute;ritos</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">&Eacute; uma capacita&ccedil;&atilde;o sobrenatural que permite conhecermos o car&aacute;ter dos esp&iacute;ritos. Ajuda o crente a separar o falso do verdadeiro, o puro do impuro, o santo do pecador. Leia 1 Jo&atilde;o 4.1.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">No Novo Testamento, este dom se manifesta revelando os esp&iacute;ritos maus e enganadores dos &uacute;ltimos tempos. Em Atos 16.16-18, Paulo enfrentou uma situa&ccedil;&atilde;o na qual precisou discernir os esp&iacute;ritos. Ele conheceu a origem de uma bajula&ccedil;&atilde;o e expulsou o dem&ocirc;nio em nome de Jesus Cristo. Os Crist&atilde;os precisam exercer este dom na atualidade, pois a cada dia mais esp&iacute;ritos vindo de Satan&aacute;s est&atilde;o presentes na sociedade.</span></span></p>
</div>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>4.Cura</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Os Dons de Cura s&atilde;o concedidos como uma solu&ccedil;&atilde;o divina capaz de amenizar o sofrimento humano, atrav&eacute;s da f&eacute; em Jesus Cristo. Existe uma limita&ccedil;&atilde;o por parte de alguns crist&atilde;os por acharem que esse dom est&aacute; relacionado apenas quando uma cura f&iacute;sica acontece. &Eacute; necess&aacute;rio entendermos que Deus pode curar o f&iacute;sico, mas o desejo dele sobre a humanidade &eacute; tamb&eacute;m curar o interior.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>5.Opera&ccedil;&atilde;o de Maravilhas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Esse dom, tamb&eacute;m chamado de opera&ccedil;&atilde;o de milagres, prod&iacute;gios e sinais, se constitui em manifesta&ccedil;&atilde;o especiais do poder de Deus que superam as limita&ccedil;&otilde;es humanas. S&atilde;o superiores e inexplic&aacute;veis. Na opera&ccedil;&atilde;o dos poderosos sinais que envolvem os milagres, o supremo Senhor, apenas usa da forma que Ele quer as leis e for&ccedil;as por Ele mesmo criadas em socorro dos Seus filhos. Isso &eacute; milagre. Leia Atos 2.9-12.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>6.F&eacute;</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O dom da f&eacute; &eacute; uma capacita&ccedil;&atilde;o especial que o Esp&iacute;rito Santo d&aacute; a alguns crentes para exercer a f&eacute; al&eacute;m dos limites naturais: Manifestam-se em grandes confian&ccedil;as, grandes peti&ccedil;&otilde;es que geralmente s&atilde;o respondidas quando s&atilde;o produto desse dom, sempre em benef&iacute;cio da Igreja de Jesus Cristo. Leia 1 Co. 12.7-10. Ela se difere da F&eacute; Salvadora, que se manifesta como resposta da proclama&ccedil;&atilde;o do evangelho, e tamb&eacute;m da F&eacute; como Fruto do Esp&iacute;rito, que melhor traduzida seria &ldquo;fidelidade&rdquo;, pois esse fruto desenvolve a fidelidade e confian&ccedil;a que todos precisamos ter em Deus, como veremos na pr&oacute;xima aula.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>7.Variedades de L&iacute;nguas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">A B&iacute;blia faz men&ccedil;&atilde;o de Variedade de L&iacute;nguas. Para esse dom edificar a igreja, &eacute; necess&aacute;rio haver interpreta&ccedil;&atilde;o; caso contr&aacute;rio, somente a pessoa que fala se edificar&aacute;.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>8.Interpreta&ccedil;&atilde;o de L&iacute;nguas</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Dom de Interpreta&ccedil;&atilde;o, portanto, complementa o Dom de L&iacute;nguas para que toda a igreja venha ser edificada. Leia 1 Co 14.13, 18, 28, 39, 40.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>9.Profecia</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Profetizar, como dom, &eacute; falar aos homens em nome de Deus, com a finalidade de edificar, exortar e consolar. Leia 1 Cor&iacute;ntios 14.3. O que fala em l&iacute;nguas, fala a Deus, a n&atilde;o ser que haja int&eacute;rprete; o que profetiza fala da parte de Deus aos homens e mulheres. De todos os dons, a profecia &eacute; o &uacute;nico sujeito ao julgamento da igreja. Leia 1 Cor&iacute;ntios 14.29. O Dom de Profecia n&atilde;o &eacute; um m&eacute;todo humano de adivinhar a sorte, de prever o futuro nem de tornar realidade os desejos dos crist&atilde;os. Leia 1 Cr&ocirc;nicas 17.1-4 e 1 Cor&iacute;ntios 14.</span></span></p>

<table align="left" cellpadding="0" cellspacing="0">
	<tbody>
		<tr>
			<td>
			<p style="text-align: center;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Dicas!&nbsp;</strong></span></span></p>

			<ol>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Ore a Deus, e pe&ccedil;a dons a Ele;</span></span></li>
				<li><span style="color:#FFFFFF"><span style="font-size:18px">Pe&ccedil;a a Deus para ser usado por Ele, mas lembre-se que o exerc&iacute;cio dos dons espirituais n&atilde;o o torna um &ldquo;super-crente&rdquo;, nem mais santo do que os outros.</span></span></li>
			</ol>
			</td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		</tr>
	</tbody>
</table>

      `,
    imagem: require('@/assets/images/start10.png'),
  },
  {
    titulo: 'Lição 11 - O Fruto do Espírito',
    videoUrl: 'https://www.youtube.com/embed/8DyAAH2Mv_k?si=tU_PrNElZudDek2-',
    descricao:
      `
      <div>
<h1><span style="color:#FFFFFF"><span style="font-size:18px"><strong>INTRODU&Ccedil;&Atilde;O</strong></span></span></h1>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Fruto do Esp&iacute;rito possibilita o crist&atilde;o aut&ecirc;ntico a viver de modo &iacute;ntegro diante de Deus e da humanidade. Naturalmente, a pessoa n&atilde;o consegue obter esta condi&ccedil;&atilde;o por esfor&ccedil;o pr&oacute;prio. O &ldquo;fruto&rdquo; de G&aacute;latas 5.22, conceituado como &ldquo;express&otilde;es do car&aacute;ter crist&atilde;o&rdquo;, est&aacute; no singular provavelmente por tratar-se de uma &uacute;nica not&aacute;vel virtude implantada pelo Esp&iacute;rito Santo de uma s&oacute; vez no crente. &Eacute; atrav&eacute;s do Fruto do Esp&iacute;rito que o crist&atilde;o participa em parte da natureza divina.</span></span></p>

<p>&nbsp;</p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l. A NATUREZA DO FRUTO DO ESP&Iacute;RITO</strong></span></span></h3>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O que representa e em que consiste o Fruto do Esp&iacute;rito na vida do Crente?</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Fruto do Esp&iacute;rito consiste nas nove virtudes ou qualidades da personalidade de Deus implantadas pelo Esp&iacute;rito da verdade no interior do crente com a finalidade de conduzi-lo &agrave; maturidade, ou seja, &agrave; imagem de Cristo. Em suma, o Fruto do Esp&iacute;rito representa os atributos de Deus; os tra&ccedil;os do Seu car&aacute;ter. O crente precisa absorv&ecirc;-lo com a ajuda do Esp&iacute;rito Santo.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O car&aacute;ter crist&atilde;o verdadeiro expressa-se no Fruto do Esp&iacute;rito que &eacute; resumido no amor. Do amor, surgem todos os demais atributos de Deus que s&atilde;o desenvolvidos no crente pelo Esp&iacute;rito Santo que nele habita. &Eacute; por isso que o amor aparece encabe&ccedil;ando a lista das virtudes crist&atilde;s geradas pelo Esp&iacute;rito de Deus, por ser a fonte origin&aacute;ria de todas as demais virtudes.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O Esp&iacute;rito Santo produz o fruto do car&aacute;ter crist&atilde;o em nossa vida &agrave; medida que cooperamos com Ele. As l&iacute;nguas, a profecia, e at&eacute; mesmo o conhecimento s&atilde;o &uacute;teis, e s&atilde;o dons maravilhosos do Esp&iacute;rito Santo, mas sua presen&ccedil;a em nossa vida nem sempre &eacute; uma indica&ccedil;&atilde;o de nossa maturidade crist&atilde;. A medida de nossa maturidade em Deus depende de qu&atilde;o bem temos permitido que o Esp&iacute;rito Santo produza os tra&ccedil;os do car&aacute;ter de Jesus em nossas vidas. A maturidade espiritual envolve melhor entendimento do Esp&iacute;rito de Deus e das necessidades das pessoas. O Fruto do Esp&iacute;rito &eacute; o resultado na vida dos que participam da natureza divina, ou seja, dos que est&atilde;o ligados a Cristo, a Videira verdadeira. Leia Jo&atilde;o 15.1-5.</span></span></p>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">Baseado em Jo&atilde;o 15, a maturidade em Cristo envolve:</span></span></p>

<ol>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Uni&atilde;o;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Limpeza ou a poda;</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px">Frutifica&ccedil;&atilde;o.</span></span></li>
</ol>
</div>

<p>&nbsp;</p>

<div>
<h3><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll. VIRTUDES OU QUALIDADES DO FRUTO DO ESP&Iacute;RITO</strong></span></span></h3>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Amor - </strong>A palavra &ldquo;caridade ou &ldquo;amor&rdquo; neste trecho das Escrituras &eacute; a tradu&ccedil;&atilde;o da palavra grega &aacute;gape. Este &eacute; o amor que flui diretamente de Deus: &ldquo;O amor de Deus est&aacute; derramado em nossos cora&ccedil;&otilde;es pelo Esp&iacute;rito Santo que nos foi dado.&rdquo; (Romanos 5.5). &Eacute; um amor de tamanha profundidade que levou Deus a dar seu &uacute;nico Filho como sacrif&iacute;cio pelos nossos pecados (Jo&atilde;o 3.16). &Eacute; o amor de Jesus por n&oacute;s: &ldquo;conhecemos o amor nisto: que Ele deu a Sua vida por n&oacute;s, e n&oacute;s devemos dar a nossa pelos irm&atilde;os.&rdquo; Leia Jo&atilde;o 3.16; 15.11 -15. &Eacute; muito f&aacute;cil amar os seus entes queridos, como os pais, filhos, esposos, parentes, amigos etc. Mas somente pelo Esp&iacute;rito Santo voc&ecirc; &eacute; capaz de dedicar o amor aos seus inimigos de tal forma que lhes deseje o bem e perdoe as suas ofensas de todo o cora&ccedil;&atilde;o.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Gozo ou Alegria - </strong>Trata-se daquela qualidade resultante de um senso de bem-estar, sobretudo de um bem-estar espiritual, por causa de uma correta rela&ccedil;&atilde;o com Deus. Apesar das dificuldades financeiras, das enfermidades, das cal&uacute;nias, pela atua&ccedil;&atilde;o do Esp&iacute;rito Santo, o crente est&aacute; cheio de gozo em sua alma, como os ap&oacute;stolos Paulo e Silas, presos injustamente por causa do evangelho. Em vez de murmurarem, cantavam e oravam. Leia Atos 16.25.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Paz &ndash; </strong>Trata-se de uma qualidade espiritual produzida pela reconcilia&ccedil;&atilde;o, pelo perd&atilde;o dos pecados e pela convers&atilde;o da alma transformada segundo a imagem de Cristo (Romanos 12.18). A queda do homem e da mulher no pecado destruiu a paz com Deus, com outros homens e mulheres, com o pr&oacute;prio ser, com a pr&oacute;pria consci&ecirc;ncia. Foi por meio da instrumentalidade da cruz que Deus voltou a estabelecer a paz. Leia Colossenses 1.20 e Ef&eacute;sios 4.2-3.</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Longanimidade &ndash; </strong>Essa palavra significa ter a habilidade de ser paciente. Essa qualidade &eacute; atribu&iacute;da a Deus. Ele tem tolerado pacientemente todas as iniquidades da humanidade. N&atilde;o se deixando levar pela ira nem pelo furor; n&atilde;o usando sua justa indigna&ccedil;&atilde;o. De n&oacute;s, os crist&atilde;os, &eacute; esperado que em nossas rela&ccedil;&otilde;es com os outros se caracterizem pela longanimidade do mesmo modo que Deus tem agido conosco. Leia 2 Co 6.6; Cl 1.11;</span></span></li>
</ol>

<p style="margin-left:50.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">3.12. Tg 1.19-20.</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Benignidade - </strong>Benignidade no original grego significa ter &ldquo;honestidade&rdquo; ou, em outras tradu&ccedil;&otilde;es, ter a inten&ccedil;&atilde;o de fazer o bem. Infelizmente muitos fazem o bem, por&eacute;m n&atilde;o tem a inten&ccedil;&atilde;o de faz&ecirc;-lo. Deus &eacute; a fonte dessa qualidade e Cristo &eacute; o melhor exemplo. Ele foi uma pessoa imensamente bem-intencionada conforme o evangelho o retrata. Essa virtude torna o crente benigno, desejoso do bem a todos, principalmente para os seus inimigos. Pv. 25.21</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Bondade - </strong>Ser bondoso &eacute; faz o bem. &Eacute; aquele que consegue canalizar toda inten&ccedil;&atilde;o boa numa pr&aacute;tica melhor ainda. Significa ser bom para todos, sem acep&ccedil;&atilde;o de pessoas. Leia Tiago 4.17</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>F&eacute; &ndash; </strong>No original grego significa tanto &ldquo;confian&ccedil;a&rdquo; quanto &ldquo;fidelidade&rdquo;. A f&eacute;, aqui, indica a confian&ccedil;a em Jesus Cristo. Mediante esta qualidade do fruto, podemos alcan&ccedil;ar a medida total da plenitude de Cristo (Ef&eacute;sios 4.13). &Agrave; medida que esse fruto amadurece em n&oacute;s, nossa confian&ccedil;a em Deus &eacute; fortalecida. &Eacute; a certeza de que Deus existe e est&aacute; sempre conosco para nos dar a vit&oacute;ria. Hb 11.6</span></span></li>
	<li><span style="color:#FFFFFF"><span style="font-size:18px"><strong>Mansid&atilde;o &ndash; </strong>Trata-se de uma submiss&atilde;o do homem para com Deus e, em seguida, para com o pr&oacute;prio homem. A mansid&atilde;o &eacute; o resultado da verdadeira humildade, que nos leva ao reconhecimento do valor alheio e a recusa de nos considerarmos superiores. Jesus</span></span></li>
</ol>
</div>

<p>&nbsp;</p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">disse: &ldquo;Bem aventurados os mansos, porque eles herdar&atilde;o a terra&rdquo; (Mateus 5.5). Essa virtude torna voc&ecirc; manso e calmo, quando antes era agressivo e se irava por qualquer coisa que o contrariava.</span></span></p>

<h3><span style="color:#FFFFFF"><span style="font-size:18px">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;i)Temperan&ccedil;a ou Dom&iacute;nio Pr&oacute;prio</span></span></h3>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>l) Nas palavras- </strong>H&aacute; um ditado popular que afirma: &ldquo;N&atilde;o devemos falar o que sabemos, mas sim, saber o que falamos&rdquo;. Isto &eacute; o que se pode chamar de temperan&ccedil;a, dom&iacute;nio pr&oacute;prio. Leia Tiago 3.2</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>ll) Nas a&ccedil;&otilde;es - </strong>Quatro jovens judeus, levados cativos para a babil&ocirc;nia, foram escolhidos por Nabucodonosor para realizarem um curso e depois servirem ao governo caldeu. O rei ordenou que os alimentasse com todas as iguarias da mesa real. Daniel e seus companheiros propuseram algo em seus cora&ccedil;&otilde;es (Leia Dan 1.8). Solicitaram, ent&atilde;o, ao despenseiro que lhes fornecesse apenas legumes durante dez dias. Se ap&oacute;s este per&iacute;odo seus semblantes estivessem abatidos, aceitariam o manjar do rei. No entanto, se apresentassem bom estado de sa&uacute;de, continuariam com a refei&ccedil;&atilde;o escolhida por eles at&eacute; o final daquele treinamento.</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">Ap&oacute;s aquele per&iacute;odo de dez dias, seus semblantes eram melhores do que os dos demais jovens. Por isso continuaram com aquela alimenta&ccedil;&atilde;o &agrave; base de legumes at&eacute; o final do curso. Esta &eacute; uma demonstra&ccedil;&atilde;o de for&ccedil;a de vontade, temperan&ccedil;a e sobriedade dos quatro Judeus.</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px"><strong>lll) Nos pensamentos &ndash; </strong>Por falta de dom&iacute;nio pr&oacute;prio, Davi cedeu &agrave; tenta&ccedil;&atilde;o que o naufragou no pecado e o fez pagar as consequ&ecirc;ncias pelo resto da vida. Era a &eacute;poca em que os reis sa&iacute;am para a guerra. No entanto, ele passeava no terra&ccedil;o de sua casa real. Seu pensamento vagava distante, em busca de algo que satisfizesse o seu ego. Repentinamente, deparou-se com uma cena que o devorou, como uma labareda de fogo a consumir algo inflam&aacute;vel: uma mulher banhava-se, nua, no quintal de sua casa. A chama da sensualidade acendeu o desejo incontido no cora&ccedil;&atilde;o do rei de Israel de possu&iacute;- la. Quando percebeu o que fizera, j&aacute; era tarde demais: havia se deitado com ela e tinha ordenado a morte do seu marido. Tudo isso aconteceu por falta do autocontrole do pensamento que o levou a cometer aquela loucura. Leia 2 Samuel 11.1-4.</span></span></p>

<p style="margin-left: 40px;"><span style="color:#FFFFFF"><span style="font-size:18px">O crente deve sempre ocupar-se com coisas boas. E a melhor terapia &eacute; ler a B&iacute;blia, cantar hinos de louvor ao Senhor, visitar os novos convertidos, desviados e enfermos. A palavra de Deus tamb&eacute;m nos recomenda que devemos fugir da apar&ecirc;ncia do mal (leia 1 Tassalonicenses 5.22). S&oacute; assim venceremos as tenta&ccedil;&otilde;es e manteremos a nossa vontade carnal. Onde voc&ecirc; estiver, pense nas coisas celestiais e viva com Jesus, vitoriosamente.</span></span></p>

<p>&nbsp;</p>

<h2><span style="color:#FFFFFF"><span style="font-size:18px"><strong>DISCIPULADO</strong></span></span></h2>

<p style="margin-left:14.25pt"><span style="color:#FFFFFF"><span style="font-size:18px">O fruto do Esp&iacute;rito n&atilde;o &eacute; produzido na vida de algu&eacute;m que vive de qualquer maneira. O crist&atilde;o precisa dedicar-se &agrave; ora&ccedil;&atilde;o, ao estudo da Palavra de Deus e passar por v&aacute;rias provas para alcan&ccedil;ar o seu crescimento espiritual. H&aacute; um pre&ccedil;o a ser pago para alcan&ccedil;&aacute;-lo, mas a alegria &eacute; imensur&aacute;vel e lhe sustenta at&eacute; a sua partida, ao encontro de Cristo.</span></span></p>

      `,
    imagem: require('@/assets/images/start11.png'),
  },
  {
    titulo: 'Lição 12 - Escatologia',
    videoUrl: 'https://www.youtube.com/embed/EHa57aT2WWE?si=Q8TnSbsSdVTNMYCB',
    descricao:
      `
      <div>
<h1><span style="font-size:18px"><span style="color:#FFFFFF">INTRODU&Ccedil;&Atilde;O</span></span></h1>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">A Escatologia &eacute; uma palavra de origem grega, formada pelos termos <strong>escato </strong>(&uacute;ltimo) <strong>logia (</strong>estudo), significando, portanto, estudo das &uacute;ltimas coisas, dos &uacute;ltimos acontecimentos. Assim, quando estudamos e falamos &ldquo;NO POR VIR&rdquo;, estamos estudando sobre Escatologia B&iacute;blica. Desse modo, estamos falando e estudando sobre o fim das coisas que nos s&atilde;o compreendidas e percebidas, em especial a vida humana, corpo, alma e esp&iacute;rito, e at&eacute; mesmo sobre a natureza e nosso planeta.</span></span></p>

<p>&nbsp;</p>

<h3><span style="font-size:18px"><span style="color:#FFFFFF">l. COMO E PORQUE CREMOS ASSIM</span></span></h3>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>ARREBETAMENTO </strong>&ndash; Cremos na vinda pessoal do Senhor Jesus Cristo, sendo esta vinda iminente para arrebatar a Sua Noiva (A Igreja) &ndash; (l Tessalonicenses 4.13-18, l Cor&iacute;ntios 15.51- 52), e, este acontecimento, denominamos de arrebatamento, que significa retirada &agrave; for&ccedil;a algo ou algu&eacute;m que est&aacute; sob uma determinada condi&ccedil;&atilde;o ou posse para si (Jo&atilde;o 14.1-3).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>MOMENTO DO ARREBATAMENTO &ndash; </strong>Cremos que o momento n&atilde;o deve ser nossa preocupa&ccedil;&atilde;o maior, mas, sim estarmos preparados (Mateus 24.36-44). Contudo, cremos que devemos observar os sinais apontados pelo Senhor Jesus Cristo, que seriam os sinalizadores que indicariam que a sua volta estaria pr&oacute;xima (eventos clim&aacute;ticos, terremotos, maremotos, cataclismos; guerras e rumores de guerras entre na&ccedil;&otilde;es &ldquo;Mateus 24.6-7&rdquo; &ndash; apostasias e prolifera&ccedil;&atilde;o de credos). Lucas 18.8, parte b, Mateus 24.10-12, l Tim&oacute;teo 4.1.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>QUEM PARTICIPAR&Aacute; DO ARREBATAMENTO </strong>&ndash; Cremos que participar&aacute; do arrebatamento todos os crentes fi&eacute;is ao Senhor, que esteja eles vivos ou mortos (l Tessalonicenses 4:16-17; l Cor&iacute;ntios 15:51-52; Mateus 10:32; Romanos 10:9-10).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>NOSSAS LEMBRAN&Ccedil;AS NO C&Eacute;U &ndash; </strong>Cremos que no c&eacute;u, teremos consci&ecirc;ncia sim, por&eacute;m, este estado de consci&ecirc;ncia n&atilde;o nos trar&aacute; sentimentos corrupt&iacute;veis (bons ou maus), pois seremos transformados fisiol&oacute;gica e psicologicamente (ll Cor&iacute;ntios 5:10; Mateus 17:1-6, 22:23- 32; l Cor&iacute;ntios 15:51-54). Este estado intermedi&aacute;rio &eacute; tempor&aacute;rio, pois o apogeu da esperan&ccedil;a crist&atilde; n&atilde;o &eacute; o C&eacute;u, mas nos Novos C&eacute;us e Nova Terra em corpos ressurretos.</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>ESTADO ATUAL DOS QUE MORRERAM NO SENHOR &ndash; </strong>Cremos que os que</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">morreram no Senhor Jesus Cristo, embora separados do corpo f&iacute;sico, est&atilde;o presente com Ele, desfrutando da gl&oacute;ria eterna, (Lucas 23.43; ll Cor&iacute;ntios 5.8), est&atilde;o aguardando a ressurrei&ccedil;&atilde;o, momento em que corpo f&iacute;sico, alma e esp&iacute;rito se unir&atilde;o e, por conseguinte transformados pelo Seu poder e pelo resplendor da Sua gl&oacute;ria (Filipenses 3.21, l Tessalonicenses 4.16-17, l Cor&iacute;ntios 15.51-52).</span></span></p>
</div>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>TRIBUNAL DE CRISTO - </strong>Cremos que ap&oacute;s o arrebatamento da Igreja pelo Senhor Jesus Cristo, aqueles que foram arrebatados estar&atilde;o com Ele em um momento muito especial, e este momento &eacute; o Tribunal de Cristo (ll Cor&iacute;ntios 5.10). O Tribunal de Cristo ser&aacute; t&atilde;o somente para presta&ccedil;&atilde;o de contas quanto ao que recebemos do Senhor e realizamos em seu Nome pela f&eacute;, pelo Seu Reino, e posteriormente seremos galardoados/recompensados (l Cor&iacute;ntios 3.10-14), contudo, este Tribunal n&atilde;o ter&aacute; o cond&atilde;o de condena&ccedil;&atilde;o, pois, estes, j&aacute; tem a garantia de que n&atilde;o sofrer&atilde;o o dano da segunda morte (Apocalipse 2.11, 20.6).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>A GRANDE TRIBULA&Ccedil;&Atilde;O (ANG&Uacute;STIA DE JAC&Oacute;) </strong>&ndash; Cremos que haver&aacute; um per&iacute;odo de grande sofrimento, chamado a grande tribula&ccedil;&atilde;o, conforme (Jeremias 30.7-8; Daniel 9.27; Mateus 24.21; Apocalipse 12.6). Cremos que a &ldquo;Grande Tribula&ccedil;&atilde;o&rdquo; ser&aacute; um per&iacute;odo que a B&iacute;blia diz ser temporal, e de 7(sete) anos (Daniel 9.29 e Apocalipse 13.5), e, em seu desenrolar muitas coisas haver&atilde;o de acontecer (levante do Anticristo e marca&ccedil;&atilde;o de seus adoradores &ldquo;Apocalipse 13.11-18); reten&ccedil;&atilde;o da morte &ldquo;Apocalipse 9.6&rdquo;; etc.), que sofrimento igual nunca houve e jamais haver&aacute; depois. (Apocalipse 3.10, l Tessalonicenses 4 e 5.1-11 e ll Tessalonicenses 2, l Cor&iacute;ntios 15.51-52).</span></span></li>
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>SOBRE O MIL&Ecirc;NIO &ndash; </strong>Cremos que o Mil&ecirc;nio ser&aacute; o per&iacute;odo em que o Senhor Jesus Cristo reinar&aacute; sobre a terra restaurando-a completamente (Apocalipse 20.1-6 e Isa&iacute;as 60). Cremos que durante o Mil&ecirc;nio a Igreja e todos os que participaram do arrebatamento estar&atilde;o reinando com Cristo por todo o per&iacute;odo do Reino Milenar (Apocalipse 20.4). Cremos que durante o Mil&ecirc;nio, Satan&aacute;s estar&aacute; preso sem nenhum poder de atua&ccedil;&atilde;o e influ&ecirc;ncia sobre a Humanidade (Apocalipse 20.1-3). Cremos que ap&oacute;s o Mil&ecirc;nio, Satan&aacute;s ser&aacute; solto por pouco tempo e tentar&aacute; mais uma vez a humanidade (Gogue e Magogue), por&eacute;m, ser&aacute; derrotado e lan&ccedil;ado no lago de fogo e enxofre com todos os que o seguiram (Apocalipse 20.7-10) para todo o sempre.</span></span></li>
</ol>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>SOBRE O JU&Iacute;ZO FINAL (JULGAMENTO DOS &Iacute;MPIOS) -&nbsp; </strong>Cremos que todos os</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">mortos desde o momento da queda homem (G&ecirc;nesis 3.1-19) ser&atilde;o julgados pelos escritos no livro das obras (Apocalipse 20.12-13), bem como aqueles que rejeitaram o perd&atilde;o em nosso Senhor Jesus Cristo e n&atilde;o foram encontrados seus nomes no Livro da Vida (Apocalipse 20.15).</span></span></p>

<ol style="list-style-type:lower-alpha">
	<li><span style="font-size:18px"><span style="color:#FFFFFF"><strong>SOBRE&nbsp; A&nbsp; ETERNIDADE,&nbsp; O&nbsp; &ldquo;ESTADO&nbsp; ETERNO&rdquo;&nbsp; &ndash;&nbsp; </strong>Cremos&nbsp; que&nbsp; ap&oacute;s&nbsp; o</span></span></li>
</ol>

<p style="margin-left:14.25pt"><span style="font-size:18px"><span style="color:#FFFFFF">Arrebatamento, ap&oacute;s a Grande Tribula&ccedil;&atilde;o, ap&oacute;s a Guerra de Armagedom, ap&oacute;s o Reino Milenar, ap&oacute;s a soltura e lan&ccedil;amento de Satan&aacute;s no Lago de Fogo e Enxofre, haver&aacute; Novos C&eacute;us e Nova Terra, ent&atilde;o ocorrer&aacute; o Estado Eterno. Cremos que no Estado Eterno n&atilde;o mais haver&aacute; qualquer tipo de corrup&ccedil;&atilde;o, pois, para sempre e eternamente, a presen&ccedil;a de Deus estar&aacute; conosco, na Cidade Santa a Nova Jerusal&eacute;m que foi Preparada por Deus para os seus filhos fi&eacute;is e a ali viveremos eternamente (Apocalipse 20-21).</span></span></p>

      `,
    imagem: require('@/assets/images/start12.png'),
  },

];

const cdv: Aula[] = [
  {
    titulo: 'Lição 1 - CDV: Visão e Pilares',
    videoUrl: 'https://www.youtube.com/embed/MkRQqATogCU?si=k2y1mzA92MtZTIrc',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv1.png'),
  },
  {
    titulo: 'Lição 2 - A igreja e sua missão',
    videoUrl: 'https://www.youtube.com/embed/DK2qWOSDGic?si=AkwBsy4DFtCFGare',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv2.png'),
  },
  {
    titulo: 'Lição 3 - O discípulo, a igreja e a cultura',
    videoUrl: 'https://www.youtube.com/embed/-ns29AeYozg?si=sLRQ-wKboJPTggNo',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv3.png'),
  },
    {
    titulo: 'Lição 4 - Descobrindo os Dons Espirituais',
    videoUrl: 'https://www.youtube.com/embed/hHdynW5aNKU?si=zzO5XwjCZGM1LbKq',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv4.png'),
  },
  {
    titulo: 'Lição 5 - Os dons de serviço prático e a igreja',
    videoUrl: 'https://www.youtube.com/embed/0cNAqvWIqxQ?si=yb7fj2tCwGfUDpoI',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv5.png'),
  },
  {
    titulo: 'Lição 6 - Os dons de ministério e a prática excelente',
    videoUrl: 'https://www.youtube.com/embed/UGEjmcza0aI?si=IJ0UdOHPU5A9sVyl',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv6.png'),
  },
  {
    titulo: 'Lição 7 - A importância dos talentos naturais',
    videoUrl: 'https://www.youtube.com/embed/LGVvLI1cmjU?si=mkpPo-_JGbBJn-nG',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv7.png'),
  },
  {
    titulo: 'Lição 8 - A vocação e o chamado divino',
    videoUrl: 'https://www.youtube.com/embed/mzxQ6vxRwUI?si=Xo57p5F4LnsIJHcx',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv8.png'),
  },
  {
    titulo: 'Lição 9 - Motivação: Servindo melhor',
    videoUrl: 'https://www.youtube.com/embed/CThlekbyqiQ?si=C-mBpNN_2LwNh7z0',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv9.png'),
  },
  {
    titulo: 'Lição 10 - Descobrindo seu estilo pessoal',
    videoUrl: 'https://www.youtube.com/embed/N01LKNkT4r0?si=UumwXY425D1vErKB',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv10.png'),
  },
  {
    titulo: 'Lição 11 - Compreendendo o temperamento pessoal',
    videoUrl: 'https://www.youtube.com/embed/4S2NmIkARpE?si=-VHqPWIHsie5FBSe',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv11.png'),
  },
  {
    titulo: 'Lição 12 Qual é a sua missão',
    videoUrl: 'https://www.youtube.com/embed/kFIYzCqkIqs?si=C_u7H0trsNawCHi2',
    descricao:
      `
      
      `,
    imagem: require('@/assets/images/cdv12.png'),
  },

];

const AulasScreen: React.FC = () => {
  const [aulaSelecionada, setAulaSelecionada] = useState<Aula | null>(null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!aulaSelecionada ? (
        <View>
          {/* Logo no topo */}
          <Image
            source={require('@/assets/images/avancai.jpg')}
            style={styles.logo}
          />
          <Text style={styles.titulo}>RESET</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}>
            {reset.map((aula, index) => (
              <TouchableOpacity
                key={index}
                style={styles.carouselItem}
                onPress={() => setAulaSelecionada(aula)}>
                <Image source={aula.imagem} style={styles.carouselImage} />
                {/* <Text style={styles.carouselText}>{aula.titulo}</Text> */}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.titulo}>START</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}>
            {start.map((aula, index) => (
              <TouchableOpacity
                key={index}
                style={styles.carouselItem}
                onPress={() => setAulaSelecionada(aula)}>
                <Image source={aula.imagem} style={styles.carouselImage} />
                {/* <Text style={styles.carouselText}>{aula.titulo}</Text> */}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.titulo}>CDV</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}>
            {cdv.map((aula, index) => (
              <TouchableOpacity
                key={index}
                style={styles.carouselItem}
                onPress={() => setAulaSelecionada(aula)}>
                <Image source={aula.imagem} style={styles.carouselImage} />
                {/* <Text style={styles.carouselText}>{aula.titulo}</Text> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
        </View>
      ) : (
        <View>
          <Text style={styles.aulaTitulo}>{aulaSelecionada.titulo}</Text>
          <WebView
            style={styles.video}
            source={{ uri: aulaSelecionada.videoUrl }}
            javaScriptEnabled
            allowsFullscreenVideo
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAulaSelecionada(null)}>
            <Text style={styles.buttonText}>Aula Concluída</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setAulaSelecionada(null)}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
          {/* <Text style={styles.descricao}>{aulaSelecionada.descricao}</Text> */}
          {/* <WebView
            originWhitelist={['*']}
            source={{ html: aulaSelecionada.descricao }}
            style={styles.webview}
            scrollEnabled={false} // Desativa scroll dentro do WebView
            containerStyle={{ backgroundColor: "transparent" }}
            setBackgroundColor={"transparent"} // Android: Remove fundo branco
            javaScriptEnabled={true} // Permite executar JavaScript
          /> */}
          <AutoHeightWebView
            originWhitelist={['*']}
            source={{ html: aulaSelecionada.descricao || "<p>Sem descrição disponível</p>" }}
            style={{ width: '100%', backgroundColor: 'transparent', marginTop: 10 }}
            scrollEnabled={false}
            javaScriptEnabled={true}
          />

        </View>
      )}
    </ScrollView>
  );
};

export default AulasScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000', // Fundo preto
    padding: 16,
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'cover', // Preenche o topo e as laterais
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#FFF', // Texto branco
  },
  carousel: {
    marginBottom: 20,
  },
  carouselItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  carouselImage: {
    width: 180,
    height: 100,
    borderRadius: 10,
  },
  carouselText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
    color: '#FFF', // Texto branco
  },
  aulaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#FFF', // Texto branco
    textAlign: 'center'
  },
  video: {
    height: 200,
    marginBottom: 16,
  },
  descricao: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    color: '#FFF', // Texto branco
  },
  button: {
    backgroundColor: '#2cab77', // Cor de fundo do botão
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF', // Cor do texto do botão
    fontSize: 20,
    fontWeight: 'bold',
  },
  webview: {
    marginTop: 20,
    height: 2500,
    backgroundColor: "transparent", // Garante fundo transparente no iOS
    color: 'white',
  },
});
