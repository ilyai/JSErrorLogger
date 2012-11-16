
/**
 * JS Error logger
 * Requires (optional) https://github.com/csnover/TraceKit
 *
 * @author igonkin-iv
 * @since 11/14/12
 */

(function() {

  function log(message, url) {
    try {
      if (window.XMLHttpRequest === undefined) { // IE 5.x-6.x:
        window.XMLHttpRequest = function () {
          try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); } catch(e) {}
          try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); } catch(e) {}
          try { return new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
          try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
          throw new Error('No XHR.');
        };
      }

      var request = new XMLHttpRequest();
      request.open('POST', url);
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify(message));
    }
    catch (e) { console.error(e) }
  }

  function JSError(message, url, line) {
    this.date     = new Date();
    this.message  = message;
    this.url      = url;
    this.line     = line;
  }

  function handleError(message, url, line) {
    var error;

    if (arguments.length === 1) {
      var stackInfo = arguments[0];
      error = new JSError(stackInfo.message, stackInfo.stack[0].url, stackInfo.stack[0].line);
      error.stack = stackInfo.stack;
    } else {
      error = new JSError(message, url, line);
    }

    log(error, '/jslog');
  }

  if (typeof TraceKit !== 'undefined') {
    // Use TraceKit
    TraceKit.report.subscribe(handleError);
  } else {
    // Fallback
    if (typeof window.onerror !== 'undefined') {
      window.onerror = handleError;
    }
  }

}).call(this);
