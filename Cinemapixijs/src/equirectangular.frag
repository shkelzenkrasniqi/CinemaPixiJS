precision mediump float;

uniform sampler2D uTexture;
varying vec2 vTextureCoord;

void main() {
    vec2 uv = vTextureCoord;
    vec2 sphereCoord = vec2(
        atan(uv.x, uv.y) * 0.15915494 + 0.5,
        acos(1.0 - length(uv)) * 0.318309886 + 0.5
    );
    gl_FragColor = texture2D(uTexture, sphereCoord);
}