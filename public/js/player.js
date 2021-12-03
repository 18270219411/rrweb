

function startPlay(target, events) {
  new rrwebPlayer({
    target: target || document.body, // 可以自定义 DOM 元素
    // 配置项
    props: {
      events,
      showDebug: true,
      mouseTail: false,
      skipInactive: true,
      // insertStyleRules: ['transform: none', 'width: 400px;']
      // unpackFn: rrwebReplay.unpack, // 这里解压有问题
      plugins: [
        rrwebConsoleReplay.getReplayConsolePlugin({
          level: ['info', 'log', 'warn', 'error'],
        }),
      ],
    },

  });
}