const alerterCss = () => {
    return `
  .dtf-alerterField {
    display: inline-flex;
    flex-direction: column;
    gap: 5px 0px;
    position: fixed;
    width: max-content;
    height: 100%;
    top: 60px;
    right: 0;
    left: 100%;
/*     right: -100%; */
    padding: 3px 3px 0 3px;
    overflow: visible;
    z-index: 1001;
  }

  .dtf-alerter {
    display: block;
    position: relative;
    top: 0;
    right: 100%;
    width: 290px;
    min-height: 60px;
    height: max-content;
    margin: 0px 0px 0px 0px;
    box-shadow: 0px 0px 3px 1px rgb(0 0 0);
    padding: 3px;
    animation-duration: 2s;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-name: slideIn;
    z-index: 10;
    opacity: 0.9;
  }
  .dtf-alerter .header {
    display: flex;
    justify-content: space-between;
  }


  .dtf-alerter.hide {
    right: 100%;
    animation-duration: 2s;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: alternate;
    animation-name: slideOut;
  }
  .dtf-alerter :is(.type, .scriptName) {
    width: max-content;
    font-size: 13px;
    font-weight: 600;
    padding: 0px 2px 0px 2px;
    border-radius: 3px;
  }

  .dtf-alerter .text {
    padding: 3px;
    font-size: 15px;
    white-space: pre-wrap;
  }
  .dtf-alerter .text::before {
    display: block;
    content: '';
    width: 100%;
    height: 4px;
    box-shadow: inset 0px 0px 3px 1px rgb(46 46 46);
  }

  .dtf-alerter.info {
    background-color: rgb(154 235 154);
  }
  .dtf-alerter.err {
    background-color: rgb(229 140 140);
  }

  @keyframes slideIn {
    from {
      right: 0%;
    }
    to {
      right: 100%;
    }
  }
  @keyframes slideOut {
    from {
      right: 100%;
    }
    to {
      right: 0%;
    }
  }`
  }
