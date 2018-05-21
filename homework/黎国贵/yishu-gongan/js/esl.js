/**
 * ESL (Enterprise Standard Loader)
 * Copyright 2013 Baidu Inc. All rights reserved.
 *
 * @file Browser绔爣鍑嗗姞杞藉櫒锛岀鍚圓MD瑙勮寖
 * @author errorrik(errorrik@gmail.com)
 *         Firede(firede@firede.us)
 */

/* jshint ignore:start */
var define;
var require;
var esl;
/* jshint ignore:end */

(function (global) {
    // "mod"寮€澶寸殑鍙橀噺鎴栧嚱鏁颁负鍐呴儴妯″潡绠＄悊鍑芥暟
    // 涓烘彁楂樺帇缂╃巼锛屼笉浣跨敤function鎴杘bject鍖呰

    /**
     * 妯″潡瀹瑰櫒
     *
     * @inner
     * @type {Object}
     */
    var modModules = {};

    /**
     * 鑷姩瀹氫箟鐨勬ā鍧楄〃
     *
     * 妯″潡define factory鏄敤鍒版椂鎵嶆墽琛岋紝浣嗘槸浠ヤ笅鍑犵鎯呭喌闇€瑕佽嚜鍔ㄩ┈涓婃墽琛岋細
     * 1. require( [moduleId], callback )
     * 2. plugin module: require( 'plugin!resource' )
     *
     * @inner
     * @type {Object}
     */
    var autoDefineModules = {};


    // 妯″潡鐘舵€佹灇涓鹃噺
    var MODULE_PRE_DEFINED = 1;
    var MODULE_ANALYZED = 2;
    var MODULE_PREPARED = 3;
    var MODULE_DEFINED = 4;

    /**
     * 鍐呭缓module鍚嶇О闆嗗悎
     *
     * @inner
     * @type {Object}
     */
    var BUILDIN_MODULE = {
        require: globalRequire,
        exports: 1,
        module: 1
    };

    /**
     * 鍏ㄥ眬require鍑芥暟
     *
     * @inner
     * @type {Function}
     */
    var actualGlobalRequire = createLocalRequire();

    // #begin-ignore
    /**
     * 瓒呮椂鎻愰啋瀹氭椂鍣�
     *
     * @inner
     * @type {number}
     */
    var waitTimeout;
    // #end-ignore

    /* eslint-disable fecs-key-spacing */
    /* eslint-disable key-spacing */
    /**
     * require閰嶇疆
     *
     * @inner
     * @type {Object}
     */
    var requireConf = {
        baseUrl    : './',
        paths      : {},
        config     : {},
        map        : {},
        packages   : [],
        // #begin-ignore
        waitSeconds: 0,
        // #end-ignore
        noRequests : {},
        urlArgs    : {}
    };
    /* eslint-enable key-spacing */

    /**
     * 鍔犺浇妯″潡
     *
     * @param {string|Array} requireId 妯″潡id鎴栨ā鍧梚d鏁扮粍锛�
     * @param {Function=} callback 鍔犺浇瀹屾垚鐨勫洖璋冨嚱鏁�
     * @return {*} requireId涓簊tring鏃惰繑鍥炴ā鍧楁毚闇插璞�
     */
    function globalRequire(requireId, callback) {
        // #begin-ignore
        // #begin assertNotContainRelativeId
        // 纭畾require鐨勬ā鍧梚d涓嶅寘鍚浉瀵筰d銆傜敤浜巊lobal require锛屾彁鍓嶉闃查毦浠ヨ窡韪殑閿欒鍑虹幇
        var invalidIds = [];

        /**
         * 鐩戞祴妯″潡id鏄惁relative id
         *
         * @inner
         * @param {string} id 妯″潡id
         */
        function monitor(id) {
            if (id.indexOf('.') === 0) {
                invalidIds.push(id);
            }
        }

        if (typeof requireId === 'string') {
            monitor(requireId);
        }
        else {
            each(
                requireId,
                function (id) {
                    monitor(id);
                }
            );
        }

        // 鍖呭惈鐩稿id鏃讹紝鐩存帴鎶涘嚭閿欒
        if (invalidIds.length > 0) {
            throw new Error(
                '[REQUIRE_FATAL]Relative ID is not allowed in global require: '
                + invalidIds.join(', ')
            );
        }
        // #end assertNotContainRelativeId

        // 瓒呮椂鎻愰啋
        var timeout = requireConf.waitSeconds;
        if (timeout && (requireId instanceof Array)) {
            if (waitTimeout) {
                clearTimeout(waitTimeout);
            }
            waitTimeout = setTimeout(waitTimeoutNotice, timeout * 1000);
        }
        // #end-ignore

        return actualGlobalRequire(requireId, callback);
    }

    /**
     * 鐗堟湰鍙�
     *
     * @type {string}
     */
    globalRequire.version = '1.8.8';

    /**
     * loader鍚嶇О
     *
     * @type {string}
     */
    globalRequire.loader = 'esl';

    /**
     * 灏嗘ā鍧楁爣璇嗚浆鎹㈡垚鐩稿鐨剈rl
     *
     * @param {string} id 妯″潡鏍囪瘑
     * @return {string}
     */
    globalRequire.toUrl = actualGlobalRequire.toUrl;

    // #begin-ignore
    /**
     * 瓒呮椂鎻愰啋鍑芥暟
     *
     * @inner
     */
    function waitTimeoutNotice() {
        var hangModules = [];
        var missModules = [];
        var hangModulesMap = {};
        var missModulesMap = {};
        var visited = {};

        /**
         * 妫€鏌ユā鍧楃殑鍔犺浇閿欒
         *
         * @inner
         * @param {string} id 妯″潡id
         * @param {boolean} hard 鏄惁瑁呰浇鏃朵緷璧�
         */
        function checkError(id, hard) {
            if (visited[id] || modIs(id, MODULE_DEFINED)) {
                return;
            }

            visited[id] = 1;

            if (!modIs(id, MODULE_PREPARED)) {
                // HACK: 涓篻zip鍚庝綋绉紭鍖栵紝涓嶅仛鎶藉彇
                if (!hangModulesMap[id]) {
                    hangModulesMap[id] = 1;
                    hangModules.push(id);
                }
            }

            var mod = modModules[id];
            if (!mod) {
                if (!missModulesMap[id]) {
                    missModulesMap[id] = 1;
                    missModules.push(id);
                }
            }
            else if (hard) {
                if (!hangModulesMap[id]) {
                    hangModulesMap[id] = 1;
                    hangModules.push(id);
                }

                each(
                    mod.depMs,
                    function (dep) {
                        checkError(dep.absId, dep.hard);
                    }
                );
            }
        }

        /* eslint-disable guard-for-in */
        for (var id in autoDefineModules) {
            checkError(id, 1);
        }
        /* eslint-enable guard-for-in */

        if (hangModules.length || missModules.length) {
            throw new Error(
                '[MODULE_TIMEOUT]Hang( '
                + (hangModules.join(', ') || 'none')
                + ' ) Miss( '
                + (missModules.join(', ') || 'none')
                + ' )'
            );
        }
    }
    // #end-ignore

    /**
     * 鏈瀹氫箟鐨勬ā鍧楅泦鍚�
     * 涓昏瀛樺偍鍖垮悕鏂瑰紡define鐨勬ā鍧�
     *
     * @inner
     * @type {Array}
     */
    var wait4PreDefine = [];

    /**
     * 瀹屾垚妯″潡棰勫畾涔夛紝姝ゆ椂澶勭悊鐨勬ā鍧楁槸鍖垮悕define鐨勬ā鍧�
     *
     * @inner
     * @param {string} currentId 鍖垮悕define鐨勬ā鍧楃殑id
     */
    function completePreDefine(currentId) {
        // HACK: 杩欓噷鍦↖E涓嬫湁涓€ц兘闄烽槺锛屼笉鑳戒娇鐢ㄤ换浣曞彉閲忋€�
        //       鍚﹀垯璨屼技浼氬舰鎴愬彉閲忓紩鐢ㄥ拰淇敼鐨勮鍐欓攣锛屽鑷磜ait4PreDefine閲婃斁鍥伴毦
        each(wait4PreDefine, function (mod) {
            modPreDefine(
                currentId,
                mod.deps,
                mod.factory
            );
        });

        wait4PreDefine.length = 0;
        modAnalyse(currentId);
    }

    /**
     * 瀹氫箟妯″潡
     *
     * @param {string=} id 妯″潡鏍囪瘑
     * @param {Array=} dependencies 渚濊禆妯″潡鍒楄〃
     * @param {Function=} factory 鍒涘缓妯″潡鐨勫伐鍘傛柟娉�
     */
    function globalDefine(id, dependencies, factory) {
        // define(factory)
        // define(dependencies, factory)
        // define(id, factory)
        // define(id, dependencies, factory)
        if (factory == null) {
            if (dependencies == null) {
                factory = id;
                id = null;
            }
            else {
                factory = dependencies;
                dependencies = null;
                if (id instanceof Array) {
                    dependencies = id;
                    id = null;
                }
            }
        }

        if (factory == null) {
            return;
        }

        var opera = window.opera;

        // IE涓嬮€氳繃current script鐨刣ata-require-id鑾峰彇褰撳墠id
        if (
            !id
            && document.attachEvent
            && (!(opera && opera.toString() === '[object Opera]'))
        ) {
            var currentScript = getCurrentScript();
            id = currentScript && currentScript.getAttribute('data-require-id');
        }

        if (id) {
            modPreDefine(id, dependencies, factory);
        }
        else {
            // 绾綍鍒板叡浜彉閲忎腑锛屽湪load鎴杛eadystatechange涓鐞�
            // 鏍囧噯娴忚鍣ㄤ笅锛屼娇鐢ㄥ尶鍚峝efine鏃讹紝灏嗚繘鍏ヨ繖涓垎鏀�
            wait4PreDefine[0] = {
                deps: dependencies,
                factory: factory
            };
        }
    }

    globalDefine.amd = {};

    /**
     * 妯″潡閰嶇疆鑾峰彇鍑芥暟
     *
     * @inner
     * @return {Object} 妯″潡閰嶇疆瀵硅薄
     */
    function moduleConfigGetter() {
        var conf = requireConf.config[this.id];
        if (conf && typeof conf === 'object') {
            return conf;
        }

        return {};
    }

    /**
     * 棰勫畾涔夋ā鍧�
     *
     * @inner
     * @param {string} id 妯″潡鏍囪瘑
     * @param {Array.<string>} dependencies 鏄惧紡澹版槑鐨勪緷璧栨ā鍧楀垪琛�
     * @param {*} factory 妯″潡瀹氫箟鍑芥暟鎴栨ā鍧楀璞�
     */
    function modPreDefine(id, dependencies, factory) {
        // 灏嗘ā鍧楀瓨鍏ュ鍣�
        //
        // 妯″潡鍐呴儴淇℃伅鍖呮嫭
        // -----------------------------------
        // id: module id
        // depsDec: 妯″潡瀹氫箟鏃跺０鏄庣殑渚濊禆
        // deps: 妯″潡渚濊禆锛岄粯璁や负['require', 'exports', 'module']
        // factory: 鍒濆鍖栧嚱鏁版垨瀵硅薄
        // factoryDeps: 鍒濆鍖栧嚱鏁扮殑鍙傛暟渚濊禆
        // exports: 妯″潡鐨勫疄闄呮毚闇插璞★紙AMD瀹氫箟锛�
        // config: 鐢ㄤ簬鑾峰彇妯″潡閰嶇疆淇℃伅鐨勫嚱鏁帮紙AMD瀹氫箟锛�
        // state: 妯″潡褰撳墠鐘舵€�
        // require: local require鍑芥暟
        // depMs: 瀹為檯渚濊禆鐨勬ā鍧楅泦鍚堬紝鏁扮粍褰㈠紡
        // depMkv: 瀹為檯渚濊禆鐨勬ā鍧楅泦鍚堬紝琛ㄥ舰寮忥紝渚夸簬鏌ユ壘
        // depRs: 瀹為檯渚濊禆鐨勮祫婧愰泦鍚�
        // depPMs: 鐢ㄤ簬鍔犺浇璧勬簮鐨勬ā鍧楅泦鍚堬紝key鏄ā鍧楀悕锛寁alue鏄�1锛屼粎鐢ㄤ簬蹇嵎鏌ユ壘
        // ------------------------------------
        if (!modModules[id]) {
            /* eslint-disable key-spacing */
            modModules[id] = {
                id          : id,
                depsDec     : dependencies,
                deps        : dependencies || ['require', 'exports', 'module'],
                factoryDeps : [],
                factory     : factory,
                exports     : {},
                config      : moduleConfigGetter,
                state       : MODULE_PRE_DEFINED,
                require     : createLocalRequire(id),
                depMs       : [],
                depMkv      : {},
                depRs       : [],
                depPMs      : []
            };
            /* eslint-enable key-spacing */
        }
    }

    /**
     * 棰勫垎鏋愭ā鍧�
     *
     * 棣栧厛锛屽畬鎴愬factory涓０鏄庝緷璧栫殑鍒嗘瀽鎻愬彇
     * 鐒跺悗锛屽皾璇曞姞杞�"璧勬簮鍔犺浇鎵€闇€妯″潡"
     *
     * 闇€瑕佸厛鍔犺浇妯″潡鐨勫師鍥犳槸锛氬鏋滄ā鍧椾笉瀛樺湪锛屾棤娉曡繘琛宺esourceId normalize鍖�
     * modAnalyse瀹屾垚鍚庣画鐨勪緷璧栧垎鏋愬鐞嗭紝骞惰繘琛屼緷璧栨ā鍧楃殑鍔犺浇
     *
     * @inner
     * @param {string} id 妯″潡id
     */
    function modAnalyse(id) {
        var mod = modModules[id];
        if (!mod || modIs(id, MODULE_ANALYZED)) {
            return;
        }

        var deps = mod.deps;
        var factory = mod.factory;
        var hardDependsCount = 0;

        // 鍒嗘瀽function body涓殑require
        // 濡傛灉鍖呭惈鏄惧紡渚濊禆澹版槑锛屾牴鎹瓵MD瑙勫畾鍜屾€ц兘鑰冭檻锛屽彲浠ヤ笉鍒嗘瀽factoryBody
        if (typeof factory === 'function') {
            hardDependsCount = Math.min(factory.length, deps.length);

            // If the dependencies argument is present, the module loader
            // SHOULD NOT scan for dependencies within the factory function.
            !mod.depsDec && factory.toString()
                .replace(/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg, '')
                .replace(/require\(\s*(['"'])([^'"]+)\1\s*\)/g,
                    function ($0, $1, depId) {
                        deps.push(depId);
                    }
                );
        }

        var requireModules = [];
        each(deps, function (depId, index) {
            var idInfo = parseId(depId);
            var absId = normalize(idInfo.mod, id);
            var moduleInfo;
            var resInfo;

            if (absId && !BUILDIN_MODULE[absId]) {
                // 濡傛灉渚濊禆鏄竴涓祫婧愶紝灏嗗叾淇℃伅娣诲姞鍒癿odule.depRs
                //
                // module.depRs涓殑椤规湁鍙兘鏄噸澶嶇殑銆�
                // 鍦ㄨ繖涓樁娈碉紝鍔犺浇resource鐨刴odule鍙兘杩樻湭defined锛�
                // 瀵艰嚧姝ゆ椂resource id鏃犳硶琚玭ormalize銆�
                //
                // 姣斿瀵筧/b/c鑰岃█锛屼笅闈㈠嚑涓猺esource鍙兘鎸囩殑鏄悓涓€涓祫婧愶細
                // - js!../name.js
                // - js!a/name.js
                // - ../../js!../name.js
                //
                // 鎵€浠ュ姞杞借祫婧愮殑module ready鏃讹紝闇€瑕侀亶鍘唌odule.depRs杩涜澶勭悊
                if (idInfo.res) {
                    resInfo = {
                        id: depId,
                        mod: absId,
                        res: idInfo.res
                    };
                    autoDefineModules[absId] = 1;
                    mod.depPMs.push(absId);
                    mod.depRs.push(resInfo);
                }

                // 瀵逛緷璧栨ā鍧楃殑id normalize鑳戒繚璇佹纭€э紝鍦ㄦ澶勮繘琛屽幓閲�
                moduleInfo = mod.depMkv[absId];
                if (!moduleInfo) {
                    moduleInfo = {
                        id: idInfo.mod,
                        absId: absId,
                        hard: index < hardDependsCount
                    };
                    mod.depMs.push(moduleInfo);
                    mod.depMkv[absId] = moduleInfo;
                    requireModules.push(absId);
                }
            }
            else {
                moduleInfo = {absId: absId};
            }

            // 濡傛灉褰撳墠姝ｅ湪鍒嗘瀽鐨勪緷璧栭」鏄痙efine涓０鏄庣殑锛�
            // 鍒欒褰曞埌module.factoryDeps涓�
            // 鍦╢actory invoke鍓嶅皢鐢ㄤ簬鐢熸垚invoke arguments
            if (index < hardDependsCount) {
                mod.factoryDeps.push(resInfo || moduleInfo);
            }
        });

        mod.state = MODULE_ANALYZED;
        modInitFactoryInvoker(id);
        nativeRequire(requireModules);
    }

    /**
     * 瀵逛竴浜涢渶瑕佽嚜鍔ㄥ畾涔夌殑妯″潡杩涜鑷姩瀹氫箟
     *
     * @inner
     */
    function modAutoInvoke() {
        /* eslint-disable guard-for-in */
        for (var id in autoDefineModules) {
            modUpdatePreparedState(id);
            modTryInvokeFactory(id);
        }
        /* eslint-enable guard-for-in */
    }

    /**
     * 鏇存柊妯″潡鐨勫噯澶囩姸鎬�
     *
     * @inner
     * @param {string} id 妯″潡id
     */
    function modUpdatePreparedState(id) {
        var visited = {};
        update(id);

        function update(id) {
            if (!modIs(id, MODULE_ANALYZED)) {
                return false;
            }
            if (modIs(id, MODULE_PREPARED) || visited[id]) {
                return true;
            }

            visited[id] = 1;
            var mod = modModules[id];
            var prepared = true;

            each(
                mod.depMs,
                function (dep) {
                    return (prepared = update(dep.absId));
                }
            );

            // 鍒ゆ柇resource鏄惁鍔犺浇瀹屾垚銆傚鏋渞esource鏈姞杞藉畬鎴愶紝鍒欒涓烘湭鍑嗗濂�
            /* jshint ignore:start */
            prepared && each(
                mod.depRs,
                function (dep) {
                    prepared = !!(dep.absId && modIs(dep.absId, MODULE_DEFINED));
                    return prepared;
                }
            );
            /* jshint ignore:end */

            if (prepared) {
                mod.state = MODULE_PREPARED;
            }

            return prepared;
        }
    }

    /**
     * 鍒濆鍖栨ā鍧楀畾涔夋椂鎵€闇€鐨刦actory鎵ц鍣�
     *
     * @inner
     * @param {string} id 妯″潡id
     */
    function modInitFactoryInvoker(id) {
        var mod = modModules[id];
        var invoking;

        mod.invokeFactory = invokeFactory;
        /* eslint-disable max-nested-callbacks */
        each(
            mod.depPMs,
            function (pluginModuleId) {

                modAddDefinedListener(
                    pluginModuleId,
                    function () {
                        each(mod.depRs, function (res) {
                            if (!res.absId && res.mod === pluginModuleId) {
                                res.absId = normalize(res.id, id);
                                nativeRequire([res.absId], modAutoInvoke);
                            }
                        });
                    }
                );

            }
        );
        /* eslint-enable max-nested-callbacks */

        /**
         * 鍒濆鍖栨ā鍧�
         *
         * @inner
         */
        function invokeFactory() {
            if (invoking || mod.state !== MODULE_PREPARED) {
                return;
            }

            invoking = 1;

            // 鎷兼帴factory invoke鎵€闇€鐨刟rguments
            var factoryReady = 1;
            var factoryDeps = [];
            each(
                mod.factoryDeps,
                function (dep) {
                    var depId = dep.absId;

                    if (!BUILDIN_MODULE[depId]) {
                        modTryInvokeFactory(depId);
                        if (!modIs(depId, MODULE_DEFINED)) {
                            factoryReady = 0;
                            return false;
                        }
                    }

                    factoryDeps.push(depId);
                }
            );

            if (factoryReady) {
                try {
                    var args = modGetModulesExports(
                        factoryDeps,
                        {
                            require: mod.require,
                            exports: mod.exports,
                            module: mod
                        }
                    );

                    // 璋冪敤factory鍑芥暟鍒濆鍖杕odule
                    var factory = mod.factory;
                    var exports = typeof factory === 'function'
                        ? factory.apply(global, args)
                        : factory;

                    if (exports != null) {
                        mod.exports = exports;
                    }

                    mod.invokeFactory = null;
                    delete autoDefineModules[id];
                }
                catch (ex) {
                    invoking = 0;
                    if (/^\[MODULE_MISS\]"([^"]+)/.test(ex.message)) {
                        // 鍑洪敊锛屽垯璇存槑鍦╢actory鐨勮繍琛屼腑锛岃require鐨勬ā鍧楁槸闇€瑕佺殑
                        // 鎵€浠ユ妸瀹冨姞鍏ュ己渚濊禆涓�
                        var hardCirclurDep = mod.depMkv[RegExp.$1];
                        hardCirclurDep && (hardCirclurDep.hard = 1);
                        return;
                    }

                    throw ex;
                }

                // 瀹屾垚define
                // 涓嶆斁鍦╰ry閲岋紝閬垮厤鍚庣画鐨勮繍琛岄敊璇杩欓噷鍚炴帀
                modDefined(id);
            }
        }
    }

    /**
     * 鍒ゆ柇妯″潡鏄惁瀹屾垚鐩稿簲鐨勭姸鎬�
     *
     * @inner
     * @param {string} id 妯″潡鏍囪瘑
     * @param {number} state 鐘舵€佺爜锛屼娇鐢ㄦ椂浼犲叆鐩稿簲鐨勬灇涓惧彉閲忥紝姣斿`MODULE_DEFINED`
     * @return {boolean} 鏄惁瀹屾垚鐩稿簲鐨勭姸鎬�
     */
    function modIs(id, state) {
        return modModules[id] && modModules[id].state >= state;
    }

    /**
     * 灏濊瘯鎵ц妯″潡factory鍑芥暟锛岃繘琛屾ā鍧楀垵濮嬪寲
     *
     * @inner
     * @param {string} id 妯″潡id
     */
    function modTryInvokeFactory(id) {
        var mod = modModules[id];

        if (mod && mod.invokeFactory) {
            mod.invokeFactory();
        }
    }

    /**
     * 鏍规嵁妯″潡id鏁扮粍锛岃幏鍙栧叾鐨別xports鏁扮粍
     * 鐢ㄤ簬妯″潡鍒濆鍖栫殑factory鍙傛暟鎴杛equire鐨刢allback鍙傛暟鐢熸垚
     *
     * @inner
     * @param {Array} modules 妯″潡id鏁扮粍
     * @param {Object} buildinModules 鍐呭缓妯″潡瀵硅薄
     * @return {Array} 妯″潡exports鏁扮粍
     */
    function modGetModulesExports(modules, buildinModules) {
        var args = [];
        each(
            modules,
            function (id, index) {
                args[index] = buildinModules[id] || modGetModuleExports(id);
            }
        );

        return args;
    }

    /**
     * 妯″潡瀹氫箟瀹屾垚浜嬩欢鐩戝惉鍣ㄥ鍣�
     *
     * @inner
     * @type {Object}
     */
    var modDefinedListeners = {};

    /**
     * 娣诲姞妯″潡瀹氫箟瀹屾垚鏃堕棿鐨勭洃鍚櫒
     *
     * @inner
     * @param {string} id 妯″潡鏍囪瘑
     * @param {Function} listener 鐩戝惉鍑芥暟
     */
    function modAddDefinedListener(id, listener) {
        if (modIs(id, MODULE_DEFINED)) {
            listener();
            return;
        }

        var listeners = modDefinedListeners[id];
        if (!listeners) {
            listeners = modDefinedListeners[id] = [];
        }

        listeners.push(listener);
    }

    /**
     * 妯″潡鐘舵€佸垏鎹负瀹氫箟瀹屾垚
     * 鍥犱负闇€瑕佽Е鍙戜簨浠讹紝MODULE_DEFINED鐘舵€佸垏鎹㈤€氳繃璇ュ嚱鏁�
     *
     * @inner
     * @param {string} id 妯″潡鏍囪瘑
     */
    function modDefined(id) {
        var listeners = modDefinedListeners[id] || [];
        var mod = modModules[id];
        mod.state = MODULE_DEFINED;

        var len = listeners.length;
        while (len--) {
            // 杩欓噷涓嶅仛function绫诲瀷鐨勬娴�
            // 鍥犱负listener閮芥槸閫氳繃modOn浼犲叆鐨勶紝modOn涓哄唴閮ㄨ皟鐢�
            listeners[len]();
        }

        // 娓呯悊listeners
        listeners.length = 0;
        delete modDefinedListeners[id];
    }

    /**
     * 鑾峰彇妯″潡鐨別xports
     *
     * @inner
     * @param {string} id 妯″潡鏍囪瘑
     * @return {*} 妯″潡鐨別xports
     */
    function modGetModuleExports(id) {
        if (modIs(id, MODULE_DEFINED)) {
            return modModules[id].exports;
        }

        return null;
    }

    /**
     * 鑾峰彇妯″潡
     *
     * @param {string|Array} ids 妯″潡鍚嶇О鎴栨ā鍧楀悕绉板垪琛�
     * @param {Function=} callback 鑾峰彇妯″潡瀹屾垚鏃剁殑鍥炶皟鍑芥暟
     * @param {string} baseId 鍩虹id锛岀敤浜庡綋ids鏄痳elative id鏃剁殑normalize
     * @param {Object} noRequests 鏃犻渶鍙戣捣璇锋眰鐨勬ā鍧楅泦鍚�
     * @return {Object} 妯″潡瀵硅薄
     */
    function nativeRequire(ids, callback, baseId, noRequests) {
        // 鏍规嵁 https://github.com/amdjs/amdjs-api/wiki/require
        // It MUST throw an error if the module has not
        // already been loaded and evaluated.
        if (typeof ids === 'string') {
            modTryInvokeFactory(ids);
            if (!modIs(ids, MODULE_DEFINED)) {
                throw new Error('[MODULE_MISS]"' + ids + '" is not exists!');
            }

            return modGetModuleExports(ids);
        }

        noRequests = noRequests || {};
        var isCallbackCalled = 0;
        if (ids instanceof Array) {
            tryFinishRequire();

            if (!isCallbackCalled) {
                each(ids, function (id) {
                    if (!(BUILDIN_MODULE[id] || modIs(id, MODULE_DEFINED))) {
                        modAddDefinedListener(id, tryFinishRequire);

                        if (!noRequests[id]) {
                            (id.indexOf('!') > 0
                                    ? loadResource
                                    : loadModule
                            )(id, baseId);
                        }

                        modAnalyse(id);
                    }
                });

                modAutoInvoke();
            }
        }

        /**
         * 灏濊瘯瀹屾垚require锛岃皟鐢╟allback
         * 鍦ㄦā鍧椾笌鍏朵緷璧栨ā鍧楅兘鍔犺浇瀹屾椂璋冪敤
         *
         * @inner
         */
        function tryFinishRequire() {
            if (!isCallbackCalled) {
                var isAllCompleted = 1;
                each(ids, function (id) {
                    if (!BUILDIN_MODULE[id]) {
                        return (isAllCompleted = !!modIs(id, MODULE_DEFINED));
                    }
                });

                // 妫€娴嬪苟璋冪敤callback
                if (isAllCompleted) {
                    isCallbackCalled = 1;

                    (typeof callback === 'function') && callback.apply(
                        global,
                        modGetModulesExports(ids, BUILDIN_MODULE)
                    );
                }
            }
        }
    }

    /**
     * 姝ｅ湪鍔犺浇鐨勬ā鍧楀垪琛�
     *
     * @inner
     * @type {Object}
     */
    var loadingModules = {};

    /**
     * 鍔犺浇妯″潡
     *
     * @inner
     * @param {string} moduleId 妯″潡鏍囪瘑
     */
    function loadModule(moduleId) {
        if (loadingModules[moduleId] || modModules[moduleId]) {
            return;
        }

        loadingModules[moduleId] = 1;

        // 鍒涘缓script鏍囩
        //
        // 杩欓噷涓嶆寕鎺nerror鐨勯敊璇鐞�
        // 鍥犱负楂樼骇娴忚鍣ㄥ湪devtool鐨刢onsole闈㈡澘浼氭姤閿�
        // 鍐峵hrow涓€涓狤rror澶氭涓€涓句簡
        var script = document.createElement('script');
        script.setAttribute('data-require-id', moduleId);
        script.src = toUrl(moduleId + '.js');
        script.async = true;
        if (script.readyState) {
            script.onreadystatechange = loadedListener;
        }
        else {
            script.onload = loadedListener;
        }
        appendScript(script);

        /**
         * script鏍囩鍔犺浇瀹屾垚鐨勪簨浠跺鐞嗗嚱鏁�
         *
         * @inner
         */
        function loadedListener() {
            var readyState = script.readyState;
            if (
                typeof readyState === 'undefined'
                || /^(loaded|complete)$/.test(readyState)
            ) {
                script.onload = script.onreadystatechange = null;
                script = null;

                completePreDefine(moduleId);
                /* eslint-disable guard-for-in */
                for (var key in autoDefineModules) {
                    modAnalyse(key);
                }
                /* eslint-enable guard-for-in */
                modAutoInvoke();
            }
        }
    }

    /**
     * 鍔犺浇璧勬簮
     *
     * @inner
     * @param {string} pluginAndResource 鎻掍欢涓庤祫婧愭爣璇�
     * @param {string} baseId 褰撳墠鐜鐨勬ā鍧楁爣璇�
     */
    function loadResource(pluginAndResource, baseId) {
        if (modModules[pluginAndResource]) {
            return;
        }

        var idInfo = parseId(pluginAndResource);
        var resource = {
            id: pluginAndResource,
            state: MODULE_ANALYZED
        };
        modModules[pluginAndResource] = resource;

        /**
         * plugin鍔犺浇瀹屾垚鐨勫洖璋冨嚱鏁�
         *
         * @inner
         * @param {*} value resource鐨勫€�
         */
        function pluginOnload(value) {
            resource.exports = value || true;
            modDefined(pluginAndResource);
        }

        /* jshint ignore:start */
        /**
         * 璇ユ柟娉曞厑璁竝lugin浣跨敤鍔犺浇鐨勮祫婧愬０鏄庢ā鍧�
         *
         * @param {string} id 妯″潡id
         * @param {string} text 妯″潡澹版槑瀛楃涓�
         */
        pluginOnload.fromText = function (id, text) {
            autoDefineModules[id] = 1;
            new Function(text)();
            completePreDefine(id);
        };
        /* jshint ignore:end */

        /**
         * 鍔犺浇璧勬簮
         *
         * @inner
         * @param {Object} plugin 鐢ㄤ簬鍔犺浇璧勬簮鐨勬彃浠舵ā鍧�
         */
        function load(plugin) {
            var pluginRequire = baseId
                ? modModules[baseId].require
                : actualGlobalRequire;

            plugin.load(
                idInfo.res,
                pluginRequire,
                pluginOnload,
                moduleConfigGetter.call({id: pluginAndResource})
            );
        }

        load(modGetModuleExports(idInfo.mod));
    }

    /**
     * 閰嶇疆require
     *
     * @param {Object} conf 閰嶇疆瀵硅薄
     */
    globalRequire.config = function (conf) {
        if (conf) {
            /* eslint-disable guard-for-in */
            for (var key in requireConf) {
                var newValue = conf[key];
                var oldValue = requireConf[key];

                if (!newValue) {
                    continue;
                }

                if (key === 'urlArgs' && typeof newValue === 'string') {
                    requireConf.urlArgs['*'] = newValue;
                }
                else {
                    // 绠€鍗曠殑澶氬閰嶇疆杩樻槸闇€瑕佹敮鎸侊紝鎵€浠ラ厤缃疄鐜颁负鏀寔浜岀骇mix
                    if (oldValue instanceof Array) {
                        oldValue.push.apply(oldValue, newValue);
                    }
                    else if (typeof oldValue === 'object') {
                        for (var k in newValue) {
                            oldValue[k] = newValue[k];
                        }
                    }
                    else {
                        requireConf[key] = newValue;
                    }
                }
            }
            /* eslint-enable guard-for-in */

            createConfIndex();
        }

        // 閰嶇疆淇℃伅瀵硅薄clone杩斿洖锛岄伩鍏嶈繑鍥炵粨鏋滃璞¤鐢ㄦ埛绋嬪簭淇敼鍙兘瀵艰嚧鐨勯棶棰�
        // return clone(requireConf);
    };

    /**
     * 瀵硅薄鍏嬮殕锛屾敮鎸乺aw type, Array, raw Object
     *
     * @inner
     * @param {*} source 瑕佸厠闅嗙殑瀵硅薄
     * @return {*}
     */
        // function clone(source) {
        //     var result = source;

        //     if (source instanceof Array) {
        //         result = [];
        //         each(source, function (item, i) {
        //             result[i] = clone(item);
        //         });
        //     }
        //     else if (typeof source === 'object') {
        //         result = {};
        //         for (var key in source) {
        //             if (source.hasOwnProperty(key)) {
        //                 result[key] = clone(source[key]);
        //             }
        //         }
        //     }

        //     return result;
        // }

        // 鍒濆鍖栨椂闇€瑕佸垱寤洪厤缃储寮�
    createConfIndex();

    /**
     * paths鍐呴儴绱㈠紩
     *
     * @inner
     * @type {Array}
     */
    var pathsIndex;

    /**
     * packages鍐呴儴绱㈠紩
     *
     * @inner
     * @type {Array}
     */
    var packagesIndex;

    /**
     * mapping鍐呴儴绱㈠紩
     *
     * @inner
     * @type {Array}
     */
    var mappingIdIndex;

    /**
     * urlArgs鍐呴儴绱㈠紩
     *
     * @inner
     * @type {Array}
     */
    var urlArgsIndex;

    /**
     * noRequests鍐呴儴绱㈠紩
     *
     * @inner
     * @type {Array}
     */
    var noRequestsIndex;

    /**
     * 灏唊ey涓簃odule id prefix鐨凮bject锛岀敓鎴愭暟缁勫舰寮忕殑绱㈠紩锛屽苟鎸夌収闀垮害鍜屽瓧闈㈡帓搴�
     *
     * @inner
     * @param {Object} value 婧愬€�
     * @param {boolean} allowAsterisk 鏄惁鍏佽*鍙疯〃绀哄尮閰嶆墍鏈�
     * @return {Array} 绱㈠紩瀵硅薄
     */
    function createKVSortedIndex(value, allowAsterisk) {
        var index = kv2List(value, 1, allowAsterisk);
        index.sort(descSorterByKOrName);
        return index;
    }

    /**
     * 鍒涘缓閰嶇疆淇℃伅鍐呴儴绱㈠紩
     *
     * @inner
     */
    function createConfIndex() {
        requireConf.baseUrl = requireConf.baseUrl.replace(/\/$/, '') + '/';

        // create paths index
        pathsIndex = createKVSortedIndex(requireConf.paths);

        // create mappingId index
        mappingIdIndex = createKVSortedIndex(requireConf.map, 1);
        each(
            mappingIdIndex,
            function (item) {
                item.v = createKVSortedIndex(item.v);
            }
        );

        // create packages index
        packagesIndex = [];
        each(
            requireConf.packages,
            function (packageConf) {
                var pkg = packageConf;
                if (typeof packageConf === 'string') {
                    pkg = {
                        name: packageConf.split('/')[0],
                        location: packageConf,
                        main: 'main'
                    };
                }

                pkg.location = pkg.location || pkg.name;
                pkg.main = (pkg.main || 'main').replace(/\.js$/i, '');
                pkg.reg = createPrefixRegexp(pkg.name);
                packagesIndex.push(pkg);
            }
        );
        packagesIndex.sort(descSorterByKOrName);

        // create urlArgs index
        urlArgsIndex = createKVSortedIndex(requireConf.urlArgs, 1);

        // create noRequests index
        noRequestsIndex = createKVSortedIndex(requireConf.noRequests);
        each(noRequestsIndex, function (item) {
            var value = item.v;
            var mapIndex = {};
            item.v = mapIndex;

            if (!(value instanceof Array)) {
                value = [value];
            }

            each(value, function (meetId) {
                mapIndex[meetId] = 1;
            });
        });
    }

    /**
     * 瀵归厤缃俊鎭殑绱㈠紩杩涜妫€绱�
     *
     * @inner
     * @param {string} value 瑕佹绱㈢殑鍊�
     * @param {Array} index 绱㈠紩瀵硅薄
     * @param {Function} hitBehavior 绱㈠紩鍛戒腑鐨勮涓哄嚱鏁�
     */
    function indexRetrieve(value, index, hitBehavior) {
        each(index, function (item) {
            if (item.reg.test(value)) {
                hitBehavior(item.v, item.k, item);
                return false;
            }
        });
    }

    /**
     * 灏哷妯″潡鏍囪瘑+'.extension'`褰㈠紡鐨勫瓧绗︿覆杞崲鎴愮浉瀵圭殑url
     *
     * @inner
     * @param {string} source 婧愬瓧绗︿覆
     * @return {string} url
     */
    function toUrl(source) {
        // 鍒嗙 妯″潡鏍囪瘑 鍜� .extension
        var extReg = /(\.[a-z0-9]+)$/i;
        var queryReg = /(\?[^#]*)$/;
        var extname = '';
        var id = source;
        var query = '';

        if (queryReg.test(source)) {
            query = RegExp.$1;
            source = source.replace(queryReg, '');
        }

        if (extReg.test(source)) {
            extname = RegExp.$1;
            id = source.replace(extReg, '');
        }

        var url = id;

        // paths澶勭悊鍜屽尮閰�
        var isPathMap;
        indexRetrieve(id, pathsIndex, function (value, key) {
            url = url.replace(key, value);
            isPathMap = 1;
        });

        // packages澶勭悊鍜屽尮閰�
        if (!isPathMap) {
            indexRetrieve(id, packagesIndex, function (value, key, item) {
                url = url.replace(item.name, item.location);
            });
        }

        // 鐩稿璺緞鏃讹紝闄勫姞baseUrl
        if (!/^([a-z]{2,10}:\/)?\//i.test(url)) {
            url = requireConf.baseUrl + url;
        }

        // 闄勫姞 .extension 鍜� query
        url += extname + query;

        // urlArgs澶勭悊鍜屽尮閰�
        indexRetrieve(id, urlArgsIndex, function (value) {
            url += (url.indexOf('?') > 0 ? '&' : '?') + value;
        });

        return url;
    }

    /**
     * 鍒涘缓local require鍑芥暟
     *
     * @inner
     * @param {number} baseId 褰撳墠module id
     * @return {Function} local require鍑芥暟
     */
    function createLocalRequire(baseId) {
        var requiredCache = {};
        function req(requireId, callback) {
            if (typeof requireId === 'string') {
                if (!requiredCache[requireId]) {
                    requiredCache[requireId] =
                        nativeRequire(normalize(requireId, baseId));
                }

                return requiredCache[requireId];
            }
            else if (requireId instanceof Array) {
                // 鍒嗘瀽鏄惁鏈塺esource锛屽彇鍑簆luginModule鍏�
                var pluginModules = [];
                var pureModules = [];
                var normalizedIds = [];

                each(
                    requireId,
                    function (id, i) {
                        var idInfo = parseId(id);
                        var absId = normalize(idInfo.mod, baseId);
                        pureModules.push(absId);
                        autoDefineModules[absId] = 1;

                        if (idInfo.res) {
                            pluginModules.push(absId);
                            normalizedIds[i] = null;
                        }
                        else {
                            normalizedIds[i] = absId;
                        }
                    }
                );

                var noRequestModules = {};
                each(
                    pureModules,
                    function (id) {
                        var meet;
                        indexRetrieve(
                            id,
                            noRequestsIndex,
                            function (value) {
                                meet = value;
                            }
                        );

                        if (meet) {
                            if (meet['*']) {
                                noRequestModules[id] = 1;
                            }
                            else {
                                each(pureModules, function (meetId) {
                                    if (meet[meetId]) {
                                        noRequestModules[id] = 1;
                                        return false;
                                    }
                                });
                            }
                        }
                    }
                );

                // 鍔犺浇妯″潡
                nativeRequire(
                    pureModules,
                    function () {
                        /* jshint ignore:start */
                        each(normalizedIds, function (id, i) {
                            if (id == null) {
                                normalizedIds[i] = normalize(requireId[i], baseId);
                            }
                        });
                        /* jshint ignore:end */

                        nativeRequire(normalizedIds, callback, baseId);
                    },
                    baseId,
                    noRequestModules
                );
            }
        }

        /**
         * 灏哰module ID] + '.extension'鏍煎紡鐨勫瓧绗︿覆杞崲鎴恥rl
         *
         * @inner
         * @param {string} id 绗﹀悎鎻忚堪鏍煎紡鐨勬簮瀛楃涓�
         * @return {string} url
         */
        req.toUrl = function (id) {
            return toUrl(normalize(id, baseId));
        };

        return req;
    }

    /**
     * id normalize鍖�
     *
     * @inner
     * @param {string} id 闇€瑕乶ormalize鐨勬ā鍧楁爣璇�
     * @param {string} baseId 褰撳墠鐜鐨勬ā鍧楁爣璇�
     * @return {string} normalize缁撴灉
     */
    function normalize(id, baseId) {
        if (!id) {
            return '';
        }

        baseId = baseId || '';
        var idInfo = parseId(id);
        if (!idInfo) {
            return id;
        }

        var resourceId = idInfo.res;
        var moduleId = relative2absolute(idInfo.mod, baseId);

        each(
            packagesIndex,
            function (packageConf) {
                var name = packageConf.name;
                if (name === moduleId) {
                    moduleId = name + '/' + packageConf.main;
                    return false;
                }
            }
        );

        // 鏍规嵁config涓殑map閰嶇疆杩涜module id mapping
        indexRetrieve(
            baseId,
            mappingIdIndex,
            function (value) {

                indexRetrieve(
                    moduleId,
                    value,
                    function (mdValue, mdKey) {
                        moduleId = moduleId.replace(mdKey, mdValue);
                    }
                );

            }
        );

        if (resourceId) {
            var mod = modGetModuleExports(moduleId);
            resourceId = mod.normalize
                ? mod.normalize(
                resourceId,
                function (resId) {
                    return normalize(resId, baseId);
                }
            )
                : normalize(resourceId, baseId);

            moduleId += '!' + resourceId;
        }

        return moduleId;
    }

    /**
     * 鐩稿id杞崲鎴愮粷瀵筰d
     *
     * @inner
     * @param {string} id 瑕佽浆鎹㈢殑鐩稿id
     * @param {string} baseId 褰撳墠鎵€鍦ㄧ幆澧僫d
     * @return {string} 缁濆id
     */
    function relative2absolute(id, baseId) {
        if (id.indexOf('.') === 0) {
            var basePath = baseId.split('/');
            var namePath = id.split('/');
            var baseLen = basePath.length - 1;
            var nameLen = namePath.length;
            var cutBaseTerms = 0;
            var cutNameTerms = 0;

            /* eslint-disable block-scoped-var */
            pathLoop: for (var i = 0; i < nameLen; i++) {
                switch (namePath[i]) {
                    case '..':
                        if (cutBaseTerms < baseLen) {
                            cutBaseTerms++;
                            cutNameTerms++;
                        }
                        else {
                            break pathLoop;
                        }
                        break;
                    case '.':
                        cutNameTerms++;
                        break;
                    default:
                        break pathLoop;
                }
            }
            /* eslint-enable block-scoped-var */

            basePath.length = baseLen - cutBaseTerms;
            namePath = namePath.slice(cutNameTerms);

            return basePath.concat(namePath).join('/');
        }

        return id;
    }

    /**
     * 瑙ｆ瀽id锛岃繑鍥炲甫鏈塵odule鍜宺esource灞炴€х殑Object
     *
     * @inner
     * @param {string} id 鏍囪瘑
     * @return {Object} id瑙ｆ瀽缁撴灉瀵硅薄
     */
    function parseId(id) {
        var segs = id.split('!');

        if (segs[0]) {
            return {
                mod: segs[0],
                res: segs[1]
            };
        }

        return null;
    }

    /**
     * 灏嗗璞℃暟鎹浆鎹㈡垚鏁扮粍锛屾暟缁勬瘡椤规槸甯︽湁k鍜寁鐨凮bject
     *
     * @inner
     * @param {Object} source 瀵硅薄鏁版嵁
     * @param {boolean} keyMatchable key鏄惁鍏佽琚墠缂€鍖归厤
     * @param {boolean} allowAsterisk 鏄惁鏀寔*鍖归厤鎵€鏈�
     * @return {Array.<Object>} 瀵硅薄杞崲鏁扮粍
     */
    function kv2List(source, keyMatchable, allowAsterisk) {
        var list = [];
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                var item = {
                    k: key,
                    v: source[key]
                };
                list.push(item);

                if (keyMatchable) {
                    item.reg = key === '*' && allowAsterisk
                        ? /^/
                        : createPrefixRegexp(key);
                }
            }
        }

        return list;
    }

    // 鎰熻阿requirejs锛岄€氳繃currentlyAddingScript鍏煎鑰佹棫ie
    //
    // For some cache cases in IE 6-8, the script executes before the end
    // of the appendChild execution, so to tie an anonymous define
    // call to the module name (which is stored on the node), hold on
    // to a reference to this node, but clear after the DOM insertion.
    var currentlyAddingScript;
    var interactiveScript;

    /**
     * 鑾峰彇褰撳墠script鏍囩
     * 鐢ㄤ簬ie涓媎efine鏈寚瀹歮odule id鏃惰幏鍙杋d
     *
     * @inner
     * @return {HTMLScriptElement} 褰撳墠script鏍囩
     */
    function getCurrentScript() {
        if (currentlyAddingScript) {
            return currentlyAddingScript;
        }
        else if (
            interactiveScript
            && interactiveScript.readyState === 'interactive'
        ) {
            return interactiveScript;
        }

        var scripts = document.getElementsByTagName('script');
        var scriptLen = scripts.length;
        while (scriptLen--) {
            var script = scripts[scriptLen];
            if (script.readyState === 'interactive') {
                interactiveScript = script;
                return script;
            }
        }
    }

    var headElement = document.getElementsByTagName('head')[0];
    var baseElement = document.getElementsByTagName('base')[0];
    if (baseElement) {
        headElement = baseElement.parentNode;
    }

    /**
     * 鍚戦〉闈腑鎻掑叆script鏍囩
     *
     * @inner
     * @param {HTMLScriptElement} script script鏍囩
     */
    function appendScript(script) {
        currentlyAddingScript = script;

        // If BASE tag is in play, using appendChild is a problem for IE6.
        // See: http://dev.jquery.com/ticket/2709
        baseElement
            ? headElement.insertBefore(script, baseElement)
            : headElement.appendChild(script);

        currentlyAddingScript = null;
    }

    /**
     * 鍒涘缓id鍓嶇紑鍖归厤鐨勬鍒欏璞�
     *
     * @inner
     * @param {string} prefix id鍓嶇紑
     * @return {RegExp} 鍓嶇紑鍖归厤鐨勬鍒欏璞�
     */
    function createPrefixRegexp(prefix) {
        return new RegExp('^' + prefix + '(/|$)');
    }

    /**
     * 寰幆閬嶅巻鏁扮粍闆嗗悎
     *
     * @inner
     * @param {Array} source 鏁扮粍婧�
     * @param {function(Array,Number):boolean} iterator 閬嶅巻鍑芥暟
     */
    function each(source, iterator) {
        if (source instanceof Array) {
            for (var i = 0, len = source.length; i < len; i++) {
                if (iterator(source[i], i) === false) {
                    break;
                }
            }
        }
    }

    /**
     * 鏍规嵁鍏冪礌鐨刱鎴杗ame椤硅繘琛屾暟缁勫瓧绗︽暟閫嗗簭鐨勬帓搴忓嚱鏁�
     *
     * @inner
     * @param {Object} a 瑕佹瘮杈冪殑瀵硅薄a
     * @param {Object} b 瑕佹瘮杈冪殑瀵硅薄b
     * @return {number} 姣旇緝缁撴灉
     */
    function descSorterByKOrName(a, b) {
        var aValue = a.k || a.name;
        var bValue = b.k || b.name;

        if (bValue === '*') {
            return -1;
        }

        if (aValue === '*') {
            return 1;
        }

        return bValue.length - aValue.length;
    }

    // 鏆撮湶鍏ㄥ眬瀵硅薄
    if (!define) {
        define = globalDefine;

        // 鍙兘纰板埌鍏朵粬褰㈠紡鐨刲oader锛屾墍浠ワ紝涓嶈瑕嗙洊浜哄
        if (!require) {
            require = globalRequire;
        }

        // 濡傛灉瀛樺湪鍏朵粬鐗堟湰鐨別sl锛屽湪define閭ｉ噷灏卞垽鏂繃浜嗭紝涓嶄細杩涘叆杩欎釜鍒嗘敮
        // 鎵€浠ヨ繖閲屽氨涓嶅垽鏂簡锛岀洿鎺ュ啓
        esl = globalRequire;
    }
})(this);
