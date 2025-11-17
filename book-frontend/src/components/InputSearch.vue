<template>
    <div class="input-group mb-3">
        <span class="input-group-text">
            <i class="fa-solid fa-search"></i>
        </span>
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue"
            @input="updateModelValue" @keyup.enter="submit" />
        <button class="btn btn-outline-secondary" type="button" @click="submit">
            Tìm kiếm
        </button>
    </div>
</template>

<script>
export default {
    props: { modelValue: { type: String, default: "" } },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) { this.$emit("update:modelValue", e.target.value); },
        submit() { this.$emit("submit"); },
    },
};
</script>
