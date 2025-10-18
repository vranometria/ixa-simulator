<template>
<table>
    <tbody>
        <tr>
            <td>槍</td>
            <td>{{ props.param.lancer }}</td>
            <td>騎</td>
            <td>{{ props.param.cavalry }}</td>
        </tr>
        <tr>
            <td>弓</td>
            <td>{{ props.param.archer }}</td>
            <td>器</td>
            <td>{{ props.param.weapon }}</td>
        </tr>
    </tbody>
</table>
</template>

<script setup lang="ts">
import { ParameterMatrix } from './models';


const props = defineProps<{
    param : ParameterMatrix
}>();
</script>